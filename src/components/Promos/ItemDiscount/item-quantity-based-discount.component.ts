import { IPromo } from "../../../abstract/IPromo.abstract";
import { Bill } from "../../Bill/bill.component";
import { Product } from "../../Product/product.component";

export class ItemQuantityBasedDiscount implements IPromo {
  private readonly targetProductId: string;
  private readonly countGreaterThan: number;
  private readonly newPrice: number;
  private matchingProducts: Array<Product>;

  constructor(targetProductId: string, countGreaterThan: number, newPrice: number) {
    this.targetProductId = targetProductId;
    this.newPrice = newPrice;
    this.countGreaterThan = countGreaterThan;
  }

  /**
   * @description Filter the products that match the target id
   * @param currentBill: Bill
   */
  filterProductsMatchingTheTargetId(currentBill: Bill): void {
    this.matchingProducts = currentBill.products.filter((product) => product.id === this.targetProductId);
  }

  isApplicable(currentBill: Bill): Boolean {
    this.filterProductsMatchingTheTargetId(currentBill);
    const count = this.matchingProducts.length;
    return count >= this.countGreaterThan;
  }

  activate(currentBill: Bill): Bill {
    if(!this.isApplicable(currentBill)) return currentBill;

    this.matchingProducts.forEach(product => {
      product.adjustedPrice = this.newPrice;
    });

    return currentBill;
  }
}