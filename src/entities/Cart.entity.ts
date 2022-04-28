import { Product } from "./Product.entity";
import {table} from 'table'

export class Cart {
  products: Array<Product>;
  total: number;

  constructor() {
    this.products = [];
  }

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
    const tableData = [['Product ID', 'Name', 'Price (€)']];

    this.products.forEach(item => {
      tableData.push([item.id, item.name, item.price.toLocaleString('de-DE')])
    })

    tableData.push(['Total', '', this.total.toLocaleString('de-DE')])
    console.log(table(tableData))
  }

}