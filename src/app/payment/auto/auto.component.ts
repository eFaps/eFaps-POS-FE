import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import {
  CollectService,
  Collector,
  MsgService,
  PaymentService,
  UtilsService
} from "@efaps/pos-library";
import { Payment, PaymentType } from "@efaps/pos-library";

import { PaymentForm } from "../payment-form";

@Component({
  selector: "app-auto",
  templateUrl: "./auto.component.html",
  styleUrls: ["./auto.component.scss"]
})
export class AutoComponent extends PaymentForm {
  collecting = false;
  collectors: Collector[] = [];

  constructor(
    paymentService: PaymentService,
    utilsService: UtilsService,
    fb: FormBuilder,
    private collectService: CollectService,
    private msgService: MsgService
  ) {
    super(paymentService, utilsService, fb);
  }

  ngOnInit() {
    super.ngOnInit();
    this.paymentForm = this.fb.group({
      amount: ["0.00", Validators.min(0)],
      collectorFrmCtrl: []
    });
    this.subscription$.add(
      this.collectService.getCollectors().subscribe({
        next: collectors => {
          this.collectors = collectors;
          this.paymentForm.patchValue({ collector: this.collectors[0] });
        }
      })
    );
  }

  getPayment(): Payment {
    return { type: PaymentType.CASH, amount: 0 };
  }

  addPayment() {
    const amount = this.utilsService.parse(this.paymentForm.value.amount);
    if (amount > 0) {
      this.collecting = true;
      this.collectService
        .startCollect(this.collectors[0].key, amount, {})
        .subscribe({
          next: startCollectResp =>
            this.listenForPayment(startCollectResp.collectOrderId),
          error: err => {
            console.log(err);
          }
        });
    }
  }

  private listenForPayment(collectOrderId: string) {
    this.subscription$.add(
      this.msgService.subscribeToCollectOrder(collectOrderId).subscribe({
        next: data => {
          switch (data.body) {
            case "SUCCESS":
              this.updatePayment4Collection(collectOrderId);
              break;
            case "CANCELED":
              this.collecting = false;
            case "PENDING":
            default:
          }
        }
      })
    );
  }

  private updatePayment4Collection(collectOrderId: string) {
    if (this.collecting) {
      this.collecting = false;
      this.collectService.getCollectOrder(collectOrderId).subscribe({
        next: order => {
          this.paymentForm.patchValue({ amount: order.collected.toString() });
          super.addPayment();
        }
      });
    }
  }
}
