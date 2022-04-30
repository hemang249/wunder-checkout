import { Bill } from "../components/Bill/bill.component";

export abstract class IPromo {
  
  /**
   * @description Is the promo applicable based on the conditions defined
   * @param currentBill : Bill
   * @returns Boolean
   */
  abstract isApplicable(currentBill: Bill ): Boolean;

  /**
   * @description Activates the promo and applies the discount
   * @param currentBill : Bill
   * @returns Bill
   */
  abstract activate(currentBill: Bill ): void;
}