import { Component, Input } from "@angular/core";
import {
  BalanceSummary,
  MoneyAmount,
  PaymentInfo,
  PaymentType,
} from "@efaps/pos-library";

@Component({
  selector: "app-balance-payment-list",
  templateUrl: "./balance-payment-list.component.html",
  styleUrls: ["./balance-payment-list.component.scss"],
  standalone: false,
})
export class BalancePaymentListComponent {
  PaymentType = PaymentType;
  payments: PaymentInfo[] = [];
  crossTotals: MoneyAmount[] = [];

  constructor() {}

  @Input()
  set summary(summary: BalanceSummary) {
    this.payments = [];
    if (summary) {
      summary.detail.paymentInfos.forEach((paymentInfo) => {
        this.payments.push(paymentInfo);
      });
      this.crossTotals = summary.detail.crossTotals;
    }
  }
}
