export class Product {
  public readonly name: string
  public readonly id: string
  public readonly price: number
  public adjustedPrice?: number;

  constructor(id: string, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}