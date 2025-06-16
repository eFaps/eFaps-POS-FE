import { Component, inject } from "@angular/core";
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from "@angular/forms";
import {
  Card,
  Currency,
  Payment,
  PaymentService,
  PaymentType,
  UtilsService,
  WorkspaceService,
} from "@efaps/pos-library";

import { MatButton } from "@angular/material/button";
import { MatFormField, MatPrefix } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatRadioButton, MatRadioGroup } from "@angular/material/radio";
import { KeypadComponent } from "../../shared/keypad/keypad.component";
import { PaymentForm } from "../payment-form";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"],
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatPrefix,
    MatButton,
    KeypadComponent,
    MatRadioGroup,
    MatRadioButton,
  ],
})
export class CardComponent extends PaymentForm {
  private workspaceService = inject(WorkspaceService);

  cards: Card[] = [];

  constructor() {
    const paymentService = inject(PaymentService);
    const utilsService = inject(UtilsService);
    const fb = inject(UntypedFormBuilder);

    super(paymentService, utilsService, fb);
  }

  override ngOnInit() {
    super.ngOnInit();
    this.paymentForm = this.fb.group({
      amount: ["0.00", Validators.min(0)],
      card: [],
    });
    this.workspaceService.currentWorkspace.subscribe((workspace) => {
      this.cards = workspace.cards;
      this.paymentForm.patchValue({ card: this.cards[0] });
    });
  }

  getPayment(): Payment {
    return {
      type: PaymentType.CARD,
      amount: 0,
      currency: Currency.PEN,
      exchangeRate: 0,
      cardTypeId: this.paymentForm.value.card.cardTypeId,
      cardLabel: this.paymentForm.value.card.label,
    };
  }
}
