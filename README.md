# Wunder Checkout

## Scope
Implement a checkout system that can scan items in any order and apply certain promotional
campaigns to give discounts. The system needs to be flexible regarding the promotional rules.


## Pre-requisites
Node JS LTS

## Instructions
```
# install dependencies
npm i
```

```
# start the development version
npm run dev
```

```
# build and run the build
npm start
```

```
# run unit and integration tests
npm run test
```

## Example
```
  const tenPercentDiscount = new FlatDiscount(10, 30)
  const pizzaDiscount = new ItemQuantityBasedDiscount("002", 2, 3.99)
  const bill = new Bill([tenPercentDiscount, pizzaDiscount]);
  
  let product1 = new Product("001", "Curry Sauce", 1.95);
  let product2 = new Product("002", "Pizza", 5.99);

  // "Scan" the product in one by one as a cashier would do
  bill.scanProduct(product1);
  bill.scanProduct(product2);

  bill.checkout(); // 7.94
```


## Components
The solution is split up into 'components' where the a component represents a participating entity in the domain.

**Note**: Class documentation present in the code

- ### Product
Everything in the solution revolves around a product.
```
// Create new product
const product = new Product('001', 'Curry Sauce', 2.95)
```

- ### FlatDiscount
The FlatDiscount represents promos of type **'x% discount whenever user spends more than €y'**
```
// Create new flat discount
// get 10% off when you spend more than 30
const flatDiscount = new FlatDiscount(10,30)
```

- ### ItemQuantityBasedDiscount
The ItemQuantityBasedDiscount represents promos of type **'when user buys x quantity of y product then those cost €z'**
```
// Create new item quantity based discount
// when you buy more than 3 pizza, cost reduces to 3.99 for each
const itemQuantityBasedDiscount = new ItemQuantityBasedDiscount('002', 3, 3.99)
```

- ### Bill
Bill represents well, the bill of the order. Products can be scanned into the bill. Whenever, checkout method is called, the Promos are applied and totals are calculated.
```
  const tenPercentDiscount = new FlatDiscount(10, 30)
  const pizzaDiscount = new ItemQuantityBasedDiscount("002", 2, 3.99)
  const bill = new Bill([tenPercentDiscount, pizzaDiscount]);
  
  let product1 = new Product("001", "Curry Sauce", 1.95);
  let product2 = new Product("002", "Pizza", 5.99);

  // "Scan" the product in one by one as a cashier would do
  bill.scanProduct(product1);
  bill.scanProduct(product2);

  bill.checkout(); // 7.94
```


## Tests
The project is tested using jest for both Unit and E2E Tests

```
npm run test
```

## Drawbacks & Future Scope for Enhancement
- **Multiple Flat Discounts**: Currently, It's possible to apply two Flat Percentage Discounts, in a real life scenario you wouldn't get two percentage off discounts, the greater of the two should apply
- **No scope for buy x, get y free discount**: Current item discounts only allow to reduce the cost of item. Very often, in supermarkets and stores there are discounts of form **"Buy 2 Pizzas, get 1 free"**
