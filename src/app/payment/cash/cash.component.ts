import { Component, inject } from "@angular/core";
import { UntypedFormBuilder } from "@angular/forms";
import {
  Currency,
  Payment,
  PaymentService,
  PaymentType,
  UtilsService,
} from "@efaps/pos-library";

import { PaymentForm } from "../payment-form";

@Component({
  selector: "app-cash",
  templateUrl: "./cash.component.html",
  styleUrls: ["./cash.component.scss"],
  standalone: false,
})
export class CashComponent extends PaymentForm {
  constructor() {
    const paymentService = inject(PaymentService);
    const utilsService = inject(UtilsService);
    const fb = inject(UntypedFormBuilder);

    super(paymentService, utilsService, fb);
  }

  getPayment(): Payment {
    return {
      type: PaymentType.CASH,
      amount: 0,
      currency: Currency.PEN,
      exchangeRate: 0,
    };
  }

  addNumber(_number: number) {
    const amount =
      this.utilsService.parse(this.paymentForm.value.amount) + _number;
    const amountStr = this.utilsService.toString(amount);
    this.paymentForm.patchValue({ amount: amountStr });
  }
}
