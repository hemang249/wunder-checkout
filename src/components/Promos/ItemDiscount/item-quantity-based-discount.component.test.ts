import { Bill } from "../../Bill/bill.component";
import { Product } from "../../Product/product.component";
import { ItemQuantityBasedDiscount } from "./item-quantity-based-discount.component"

describe('ItemQuantityBasedDiscount Component Test', () => {
  let itemQuanityBasedDiscountComponent: ItemQuantityBasedDiscount;
  let product: Product;
  let bill: Bill;

  let id: string = "001";
  let name: string = "Curry Sauce";
  let price: number = 30;

  let targetAmount = 2;
  let newPrice = 1;

  
  beforeEach(() => {
    itemQuanityBasedDiscountComponent = new ItemQuantityBasedDiscount(id, targetAmount, newPrice);
    product = new Product(id, name, price);
    bill = new Bill([]);
  });

  it('should be defined', () => {
    expect(itemQuanityBasedDiscountComponent).toBeDefined();
  });

  it('should be applicable or not', () => {
    bill.scanProduct(product);
    bill.scanProduct(product);

    expect(itemQuanityBasedDiscountComponent.isApplicable(bill)).toEqual(true);

    bill.products.pop();
    expect(itemQuanityBasedDiscountComponent.isApplicable(bill)).toEqual(false);
  });

  it('should activate if quantity >= the target amount', () => {
    bill.scanProduct(product);
    bill.scanProduct(product);

    itemQuanityBasedDiscountComponent.activate(bill)
    bill.products.forEach(item => {
      if(product.id === "id")
      expect(item.adjustedPrice).toEqual(newPrice)
    })
  });

  it('should not activate if quantity < the target amount', () => {
    bill.scanProduct(product);

    itemQuanityBasedDiscountComponent.activate(bill)
    bill.products.forEach(item => {
      if(product.id === "id")
      expect(item.adjustedPrice).toBeUndefined()
    })
  });
  
})