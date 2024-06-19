import { Component } from "@angular/core";
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
  selector: "app-free",
  templateUrl: "./free.component.html",
  styleUrls: ["./free.component.scss"],
})
export class FreeComponent extends PaymentForm {
  constructor(
    paymentService: PaymentService,
    utilsService: UtilsService,
    fb: UntypedFormBuilder,
  ) {
    super(paymentService, utilsService, fb);
  }

  getPayment(): Payment {
    return {
      type: PaymentType.FREE,
      amount: 0,
      currency: Currency.PEN,
      exchangeRate: 0,
    };
  }
}
