import { Product } from "../Product/product.component";
import { Bill } from "./bill.component";

describe('Bill Component Test', () => {
  let product: Product;
  let billComponent: Bill;

  let id: string = "001";
  let name: string = "Curry Sauce";
  let price: number = 30;

  
  beforeEach(() => {
    product = new Product(id, name, price);
    billComponent = new Bill([]);
  });

  it('should be defined', () => {
    expect(billComponent).toBeDefined();
  });

  it('should be able to scan', () => {
    billComponent.scanProduct(product);
    expect(billComponent.products.includes(product)).toEqual(true)
  })

  it('should calculate sub total', () => {
    billComponent.scanProduct(product);
    expect(billComponent.calculateSubtotal()).toEqual(price);
  })

  it('should checkout', () => {
    billComponent.scanProduct(product);
    expect(billComponent.checkout()).toEqual(price);
  })

})