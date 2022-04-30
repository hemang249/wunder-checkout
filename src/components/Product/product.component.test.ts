import { Product } from "./product.component"

describe('Product Component Test', () => {
  let productComponent: Product;
  let id: string = "001";
  let name: string = "Curry Sauce";
  let price: number = 1.95;

  
  beforeEach(() => {
    productComponent = new Product(id, name, price);
  });


  it('should be defined', () => {
    expect(productComponent).toBeDefined();
  });

  it('should have the appropriate members', () => {
    expect(productComponent.adjustedPrice).toBeUndefined();

    expect(productComponent.id).toBeDefined();
    expect(productComponent.id).toEqual(id);

    expect(productComponent.name).toBeDefined();
    expect(productComponent.name).toEqual(name);

    expect(productComponent.price).toBeDefined();
    expect(productComponent.price).toEqual(price);
  })
})