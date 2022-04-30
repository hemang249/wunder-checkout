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
    // sort the promos as ItemDiscounts must be applied before flat discounts
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
  public calculateSubtotal(): number {
    let subTotal: number = 0;
    this.products.forEach(item => {
      // if price has been adjusted due to a promo, then use that to calculate the sub total
      subTotal +=  item.adjustedPrice ?? item.price;
    })
    this.subTotal = subTotal;
    return this.subTotal;
  };

  /**
   * @description Checks out by applying promo rules and then prints the bill
   * @returns void
   */
  public checkout(): number {
    this.calculateSubtotal();

    this.promos.forEach(promo => {
      promo.activate(this);
      this.calculateSubtotal();
    })
    let total = this.subTotal - this.totalDiscount;
    // round to two decimal places
    this.total = Math.round(total * 100) / 100
    this.display();
    return this.total;
  }

  /**
   * @description Prints the bill as a table
   * @returns void
   */
  private display(): void {
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
  private sortPromos(promos: Array<IPromo>): void {
    this.promos = promos.sort((a: IPromo, b: IPromo) => {
      if(a instanceof FlatDiscount && b instanceof ItemQuantityBasedDiscount)
        return 1;
      else 
        return -1;
    })
  }

}