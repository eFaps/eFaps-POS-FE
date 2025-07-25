import { Component, inject } from "@angular/core";
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatFormField, MatPrefix } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatRadioButton, MatRadioGroup } from "@angular/material/radio";
import {
  CollectOrder,
  CollectService,
  Collector,
  Currency,
  MsgService,
  Payment,
  PaymentService,
  PaymentType,
  UtilsService,
} from "@efaps/pos-library";

import { KeypadComponent } from "../../shared/keypad/keypad.component";
import { PaymentForm } from "../payment-form";

@Component({
  selector: "app-auto",
  templateUrl: "./auto.component.html",
  styleUrls: ["./auto.component.scss"],
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatPrefix,
    MatButton,
    KeypadComponent,
    MatRadioGroup,
    MatRadioButton,
    MatProgressSpinner,
  ],
})
export class AutoComponent extends PaymentForm {
  private collectService = inject(CollectService);
  private msgService = inject(MsgService);

  collecting = false;
  collectors: Collector[] = [];
  mappingKey = "";
  collectOrderId = "";
  buttonTimeout = false;
  paymentType = PaymentType.ELECTRONIC;

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
      collectorFrmCtrl: [],
    });
    this.subscription$.add(
      this.collectService.getCollectors().subscribe({
        next: (collectors) => {
          this.collectors = collectors;
          this.paymentForm.patchValue({ collectorFrmCtrl: this.collectors[0] });
        },
      }),
    );
  }

  getPayment(): Payment {
    return {
      type: this.paymentType,
      amount: 0,
      currency: Currency.PEN,
      exchangeRate: 0,
      mappingKey: this.mappingKey,
      collectOrderId: this.collectOrderId,
    };
  }

  override addPayment() {
    const amount = this.utilsService.parse(this.paymentForm.value.amount);
    if (amount > 0 && this.paymentForm.value.collectorFrmCtrl) {
      this.buttonTimeout = true;
      this.collecting = true;
      this.collectService
        .startCollect(
          this.paymentForm.value.collectorFrmCtrl.key,
          amount,
          Currency.PEN,
          {},
          this.document.id!,
        )
        .subscribe({
          next: (startCollectResp) =>
            this.listenForPayment(startCollectResp.collectOrderId),
          error: (err) => {
            console.log(err);
          },
        });
      setTimeout(() => {
        this.buttonTimeout = false;
      }, 3000);
    }
  }

  private listenForPayment(collectOrderId: string) {
    this.subscription$.add(
      this.msgService.subscribeToCollectOrder(collectOrderId).subscribe({
        next: (data) => {
          switch (data.body) {
            case "SUCCESS":
              this.updatePayment4Collection(collectOrderId);
              break;
            case "CANCELED":
              this.collecting = false;
              break;
            case "PENDING":
            default:
          }
        },
      }),
    );
  }

  private updatePayment4Collection(collectOrderId: string) {
    if (this.collecting) {
      this.collecting = false;
      this.collectService.getCollectOrder(collectOrderId).subscribe({
        next: (order) => {
          this.evalPaymentType(order);
          this.paymentForm.patchValue({ amount: order.collected!.toString() });
          this.mappingKey = order.collectorKey!;
          this.collectOrderId = collectOrderId;
          super.addPayment();
          // reset the payment
          this.mappingKey = "";
          this.collectOrderId = "";
          this.paymentType = PaymentType.ELECTRONIC;
        },
      });
    }
  }

  private evalPaymentType(order: CollectOrder) {
    if (order.additionalInfo && order.additionalInfo.PaymentType) {
      switch (order.additionalInfo.PaymentType) {
        case "CARD":
          this.paymentType = PaymentType.CARD;
          break;
        case "ELECTRONIC":
          this.paymentType = PaymentType.ELECTRONIC;
          break;
        case "CASH":
          this.paymentType = PaymentType.CASH;
          break;
        case "CHANGE":
          this.paymentType = PaymentType.CHANGE;
          break;
        case "FREE":
          this.paymentType = PaymentType.FREE;
          break;
      }
    }
  }
}
