import { Product } from "../Product/product.component";
import { table } from 'table'
import { IPromo } from "../../abstract/IPromo.abstract";

export class Bill {
  products: Array<Product>;
  subTotal: number;
  totalDiscount: number;
  promos: Array<IPromo>;
  total: number;

  constructor(promos: Array<IPromo>) {
    this.products = [];
    this.totalDiscount = 0;
    this.promos = promos;
    this.total = 0;
  }

  // "scans" a product into the cart
  public scanProduct(product: Product): void {
    this.products.push(product);
    this.calculateSubtotal();
  }

  public calculateSubtotal(): void {
    let subTotal = 0;
    this.products.forEach(item => {
      subTotal += item.price
    })
    this.subTotal = subTotal;
  };

  public checkout(): void {
    this.promos.forEach(promo => {
      promo.activate(this);
    })

    this.total = this.subTotal - this.totalDiscount;
    this.display();
  }

  public display(): void {
    const tableData: Array<Array<any>> = [['Sr No.', 'Product ID', 'Name', 'Price (€)']];

    this.products.forEach((item, idx) => {
      tableData.push([
        idx + 1,
        item.id,
        item.name, 
        item.price.toLocaleString('de-DE')
      ])
    })

    tableData.push(['Sub Total', '', '', this.subTotal.toLocaleString('de-DE')])
    tableData.push(['Discount', '', '', (-this.totalDiscount).toLocaleString('de-DE')])
    tableData.push(['Total', '', '', this.total.toLocaleString('de-DE')])
    console.log(table(tableData))
    console.log("Thank you for shopping at Wunder!\n")
  }

}