import { Bill } from "./components/Bill/bill.component";
import { Product } from "./components/Product/product.component";
import { FlatDiscount } from "./components/Promos/FlatDiscount/flat-discount.component";

/**
 * The products are supplied as a simple array
 * This simulates a real shopping cart where products are just bunched together in a simple cart
 * It also simulates a scenario wherein the Checkout System is a backend API
 * and recieves the data as a JSON from the clientside
 */
const data = [
  {
    "id": "001",
    "name": "Curry Sauce",
    "price": 1.95
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
    "price": 25.00
  },
  {
    "id": "004",
    "name": "Bread Loaf",
    "price": 3.99
  }
];


function main () {
  const thirtyPercentOffDiscount = new FlatDiscount(10, 30)
  let bill = new Bill([thirtyPercentOffDiscount]);
  
  // "Scan" the product in one by one as a cashier would do
  data.forEach(item => {
    let product = new Product(item.id, item.name, item.price);
    bill.scanProduct(product);
  })

  bill.checkout();
}
main();

