import { Bill } from "./components/Bill/bill.component";
import { Product } from "./components/Product/product.component";
import { FlatDiscount } from "./components/Promos/FlatDiscount/flat-discount.component";
import { ItemQuantityBasedDiscount } from "./components/Promos/ItemDiscount/item-quantity-based-discount.component";
import { ICartItem } from "./interfaces/ICartItem.interface";

/**
 * The products are supplied as a simple array
 * This simulates a real shopping cart where products are just bunched together in a simple cart
 * It also simulates a scenario wherein the Checkout System is a backend API
 * and recieves the data as a JSON from the clientside
 */
 const cart: Array<ICartItem> = [
  {
    "id": "002",
    "name": "Pizza",
    "price": 5.99
  },
  {
    "id": "001",
    "name": "Curry Sauce",
    "price": 1.95
  },
  
  {
    "id": "002",
    "name": "Pizza",
    "price": 5.99
  },

  {
    "id": "003",
    "name": "Men's T-shirt",
    "price": 25
  },
 
];

function main () {
  const tenPercentDiscount = new FlatDiscount(10, 30)
  const pizzaDiscount = new ItemQuantityBasedDiscount("002", 2, 3.99)
  const bill = new Bill([tenPercentDiscount, pizzaDiscount]);
  
  // "Scan" the product in one by one as a cashier would do
  cart.forEach(item => {
    let product = new Product(item.id, item.name, item.price);
    bill.scanProduct(product);
  })

  bill.checkout();
}
main();