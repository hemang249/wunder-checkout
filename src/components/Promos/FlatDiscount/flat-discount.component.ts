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
    return currentBill.subTotal >= this.subTotalShouldBeMoreThan;
  }

  activate(currentBill: Bill): Bill {
    if(!this.isApplicable(currentBill)) return currentBill;
    currentBill.totalDiscount += (currentBill.subTotal * this.discountPercent/100)
    return currentBill;
  }
}