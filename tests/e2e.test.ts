import { Bill } from "../src/components/Bill/bill.component"
import { Product } from "../src/components/Product/product.component"
import { FlatDiscount } from "../src/components/Promos/FlatDiscount/flat-discount.component"
import { ItemQuantityBasedDiscount } from "../src/components/Promos/ItemDiscount/item-quantity-based-discount.component"

Product
describe('E2E Test', () => {
  let _001 = {
    id: "001",
    name: "Curry Sauce",
    price: 1.95
  }

  let _002 = {
    id: "002",
    name: "Pizza",
    price: 5.99
  }

  let _003 = {
    id: "003",
    name: "Men's T-shirt",
    price: 25.00
  }

  let p001: Product, p002: Product, p003: Product;
  let pizzaDiscount: ItemQuantityBasedDiscount
  let tenPercentDiscount: FlatDiscount
  let bill: Bill

  beforeEach(() => {
    p001 = new Product(_001.id, _001.name, _001.price)
    p002 = new Product(_002.id, _002.name, _002.price)
    p003 = new Product(_003.id, _003.name, _003.price)

    pizzaDiscount = new ItemQuantityBasedDiscount(_002.id, 2, 3.99);
    tenPercentDiscount = new FlatDiscount(10, 30);
    bill = new Bill([pizzaDiscount, tenPercentDiscount])
  })

  it('Test Case 1: With 001, 002, 003', () => {
    bill.scanProduct(p001)
    bill.scanProduct(p002)
    bill.scanProduct(p003)

    const total = bill.checkout();
    expect(total).toEqual(29.65)
  })

  it('Test Case 3: With 002, 001, 002, 003', () => {
    bill.scanProduct(p002)
    bill.scanProduct(p001)
    bill.scanProduct(p002)
    bill.scanProduct(p003)

    const total = bill.checkout();
    expect(total).toEqual(31.44)
  })
})