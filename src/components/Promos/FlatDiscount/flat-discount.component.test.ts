import { Bill } from "../../Bill/bill.component";
import { Product } from "../../Product/product.component";
import { FlatDiscount } from "./flat-discount.component"

describe('FlatDiscount Component Test', () => {
  let flatDiscountComponent: FlatDiscount;
  let product: Product;
  let bill: Bill;

  let id: string = "001";
  let name: string = "Curry Sauce";
  let price: number = 30;

  
  beforeEach(() => {
    flatDiscountComponent = new FlatDiscount(10, 30);
    product = new Product(id, name, price);
    bill = new Bill([]);
  });

  it('should be defined', () => {
    expect(flatDiscountComponent).toBeDefined();
  });

  it('should be applicable or not', () => {
    bill.scanProduct(product);
    bill.calculateSubtotal()
    expect(flatDiscountComponent.isApplicable(bill)).toEqual(true);

    product.adjustedPrice = 10;
    bill.calculateSubtotal()
    expect(flatDiscountComponent.isApplicable(bill)).toEqual(false);
  });

  it('should activate if sub total >= the target amount', () => {
    bill.scanProduct(product);
    bill.calculateSubtotal();
    flatDiscountComponent.activate(bill)
    expect(bill.totalDiscount).toEqual(product.price * 0.1);
  });

  it('should not activate if sub total < the target amount', () => {
    product.adjustedPrice = 10;
    bill.calculateSubtotal()
    flatDiscountComponent.activate(bill)
    expect(bill.totalDiscount).toEqual(0);
  });
  
})