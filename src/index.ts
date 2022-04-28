import { Cart } from "./entities/Cart.entity";
import { Product } from "./entities/Product.entity";

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
  let products: Array<Product> = [];

  data.forEach(item => {
    products.push(new Product(item.id, item.name, item.price));
  })

  let cart = new Cart(products);
  cart.display()
}
main();

