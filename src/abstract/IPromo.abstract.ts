import { Bill } from "../components/Bill/bill.component";

export abstract class IPromo {
  abstract isApplicable(currentBill: Bill ): Boolean;
  abstract activate(currentBill: Bill ): Bill;
}