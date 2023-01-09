import { Component } from "@angular/core";
import { UntypedFormBuilder, Validators } from "@angular/forms";
import {
  Currency,
  CollectService,
  Collector,
  MsgService,
  PaymentService,
  UtilsService,
} from "@efaps/pos-library";
import { Payment, PaymentType } from "@efaps/pos-library";

import { PaymentForm } from "../payment-form";

@Component({
  selector: "app-auto",
  templateUrl: "./auto.component.html",
  styleUrls: ["./auto.component.scss"],
})
export class AutoComponent extends PaymentForm {
  collecting = false;
  collectors: Collector[] = [];
  mappingKey = "";
  collectOrderId = "";
  buttonTimeout = false;

  constructor(
    paymentService: PaymentService,
    utilsService: UtilsService,
    fb: UntypedFormBuilder,
    private collectService: CollectService,
    private msgService: MsgService
  ) {
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
      })
    );
  }

  getPayment(): Payment {
    return {
      type: PaymentType.ELECTRONIC,
      amount: 0,
      currency: Currency.PEN,
      exchangeRate: 0,
      mappingKey: this.mappingKey,
      collectOrderId: this.collectOrderId
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
          this.document.id!
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
      })
    );
  }

  private updatePayment4Collection(collectOrderId: string) {
    if (this.collecting) {
      this.collecting = false;
      this.collectService.getCollectOrder(collectOrderId).subscribe({
        next: (order) => {
          this.paymentForm.patchValue({ amount: order.collected!.toString() });
          this.mappingKey = order.collectorKey!;
          this.collectOrderId = collectOrderId;
          super.addPayment();
          this.mappingKey = "";
          this.collectOrderId = "";
        },
      });
    }
  }
}
