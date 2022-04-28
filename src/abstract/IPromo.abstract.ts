import { Bill } from "../components/Bill/bill.component";

export abstract class IPromo {
  abstract activate(currentBill: Bill ): Bill;
}