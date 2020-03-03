import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import {
  Card,
  Payment,
  PaymentService,
  PaymentType,
  UtilsService,
  WorkspaceService
} from "@efaps/pos-library";

import { PaymentForm } from "../payment-form";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"]
})
export class CardComponent extends PaymentForm {
  cards: Card[] = [];

  constructor(
    paymentService: PaymentService,
    utilsService: UtilsService,
    fb: FormBuilder,
    private workspaceService: WorkspaceService
  ) {
    super(paymentService, utilsService, fb);
  }

  ngOnInit() {
    super.ngOnInit();
    this.paymentForm = this.fb.group({
      amount: ["0.00", Validators.min(0)],
      card: []
    });
    this.workspaceService.currentWorkspace.subscribe(workspace => {
      this.cards = workspace.cards;
      this.paymentForm.patchValue({ card: this.cards[0] });
    });
  }

  getPayment(): Payment {
    return {
      type: PaymentType.CARD,
      amount: 0,
      cardTypeId: this.paymentForm.value.card.cardTypeId,
      cardLabel: this.paymentForm.value.card.label
    };
  }
}
