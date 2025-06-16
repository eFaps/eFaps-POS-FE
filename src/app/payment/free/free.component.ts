import { Component, inject } from "@angular/core";
import { UntypedFormBuilder, ReactiveFormsModule } from "@angular/forms";
import {
  Currency,
  Payment,
  PaymentService,
  PaymentType,
  UtilsService,
} from "@efaps/pos-library";

import { PaymentForm } from "../payment-form";
import { MatFormField, MatPrefix } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatButton } from "@angular/material/button";
import { KeypadComponent } from "../../shared/keypad/keypad.component";

@Component({
    selector: "app-free",
    templateUrl: "./free.component.html",
    styleUrls: ["./free.component.scss"],
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatInput,
        MatPrefix,
        MatButton,
        KeypadComponent,
    ],
})
export class FreeComponent extends PaymentForm {
  constructor() {
    const paymentService = inject(PaymentService);
    const utilsService = inject(UtilsService);
    const fb = inject(UntypedFormBuilder);

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
