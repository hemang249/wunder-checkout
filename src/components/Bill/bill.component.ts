import { Product } from "../Product/product.component";
import { table } from 'table'

export class Bill {
  products: Array<Product>;
  total: number;

  constructor() {
    this.products = [];
  }

  // "scans" a product into the cart
  public scanProduct(product: Product): void {
    this.products.push(product);
    this.calculateTotal();
  }

  public calculateTotal(): void {
    let total = 0;
    this.products.forEach(item => {
      total += item.price
    })
    this.total = total;
  };

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

    tableData.push(['Total', '', '', this.total.toLocaleString('de-DE')])
    console.log(table(tableData))
    console.log("Thank you for shopping at Wunder!\n")
  }

}