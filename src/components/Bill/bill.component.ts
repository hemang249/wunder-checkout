import { Product } from "../Product/product.component";
import { table } from 'table'
import { IPromo } from "../../abstract/IPromo.abstract";
import { FlatDiscount } from "../Promos/FlatDiscount/flat-discount.component";
import { ItemQuantityBasedDiscount } from "../Promos/ItemDiscount/item-quantity-based-discount.component";

export class Bill {
  public products: Array<Product>;
  public promos: Array<IPromo>;
  public subTotal: number;
  public totalDiscount: number;
  public total: number;

  constructor(promos: Array<IPromo>) {
    this.products = [];
    this.subTotal = 0;
    this.totalDiscount = 0;
    this.total = 0;
    this.sortPromos(promos);
  }

  /**
   * @description Scans a product into the cart i.e adds its to the products array
   * @param product : Product
   * @returns void
   */
  public scanProduct(product: Product): void {
    this.products.push(product);
  }

  /**
   * @description Calculates the Sub Total
   * @returns void
   */
  public calculateSubtotal(): void {
    let subTotal = 0;
    this.products.forEach(item => {
      // if price has been adjusted due to a promo, then use that to calculate the sub total
      subTotal +=  item.adjustedPrice ?? item.price;
    })
    this.subTotal = subTotal;
  };

  /**
   * @description Checks out by applying promo rules and then prints the bill
   * @returns void
   */
  public checkout(): void {
    this.calculateSubtotal();

    this.promos.forEach(promo => {
      promo.activate(this);
      this.calculateSubtotal();
    })

    this.total = this.subTotal - this.totalDiscount;
    this.display();
  }

  /**
   * @description Prints the bill as a table
   * @returns void
   */
  public display(): void {
    const tableData: Array<Array<any>> = [['Sr No.', 'Product ID', 'Name', 'Price (€)']];

    this.products.forEach((item, idx) => {
      tableData.push([
        idx + 1,
        item.id,
        item.name, 
        (item.adjustedPrice ?? item.price).toLocaleString('de-DE')
      ])
    })

    tableData.push(['Sub Total', '', '', this.subTotal.toLocaleString('de-DE')])
    tableData.push(['Discount', '', '', (-this.totalDiscount).toLocaleString('de-DE')])
    tableData.push(['Total', '', '', this.total.toLocaleString('de-DE')])
    console.log(table(tableData))
    console.log("Thank you for shopping at Wunder!\n")
  }

  /**
   * @description Sort the Promos based on their class
   * @param promos: Array<IPromo>
   * @returns void
   */
  sortPromos(promos: Array<IPromo>): void {
    this.promos = promos.sort((a: IPromo, b: IPromo) => {
      if(a instanceof FlatDiscount && b instanceof ItemQuantityBasedDiscount)
        return 1;
      else 
        return -1;
    })
  }

}