import { IPromo } from "../../../abstract/IPromo.abstract";
import { Bill } from "../../Bill/bill.component";

export class FlatDiscount implements IPromo {
  private readonly discountPercent: number;
  private readonly subTotalShouldBeMoreThan: number;

  constructor(discountPercent: number, subTotalShouldBeMoreThan: number) {
    this.discountPercent = discountPercent;
    this.subTotalShouldBeMoreThan = subTotalShouldBeMoreThan;
  }

  isApplicable(currentBill: Bill): Boolean {
    // flat discount is applicable if the sub total is more than a certain amount
    return currentBill.subTotal >= this.subTotalShouldBeMoreThan;
  }

  activate(currentBill: Bill): void {
    if(!this.isApplicable(currentBill)) return;

    // if applicable, then discount the price by the specified amount
    currentBill.totalDiscount += (currentBill.subTotal * this.discountPercent/100)
  }
}