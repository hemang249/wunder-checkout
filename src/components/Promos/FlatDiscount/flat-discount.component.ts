import { IPromo } from "../../../abstract/IPromo.abstract";
import { Bill } from "../../Bill/bill.component";

export class FlatDiscount implements IPromo {
  discountPercent: number;
  totalShouldBeMoreThan: number;

  constructor(discountPercent: number, totalShouldBeMoreThan: number) {
    this.discountPercent = discountPercent;
    this.totalShouldBeMoreThan = totalShouldBeMoreThan;
  }

  isApplicable(currentBill: Bill): Boolean {
    return currentBill.subTotal >= this.totalShouldBeMoreThan;
  }

  activate(currentBill: Bill): Bill {
    if(!this.isApplicable(currentBill)) return currentBill;
    currentBill.totalDiscount += (currentBill.subTotal * this.discountPercent/100)
    return currentBill;
  }
}