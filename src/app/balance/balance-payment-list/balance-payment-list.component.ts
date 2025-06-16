import { Component, Input } from "@angular/core";
import { MatList, MatListItem } from "@angular/material/list";
import {
  BalanceSummary,
  CashEntry,
  MoneyAmount,
  PaymentInfo,
  PaymentType,
  PosLibraryModule,
} from "@efaps/pos-library";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-balance-payment-list",
  templateUrl: "./balance-payment-list.component.html",
  styleUrls: ["./balance-payment-list.component.scss"],
  imports: [MatList, MatListItem, PosLibraryModule, TranslatePipe],
})
export class BalancePaymentListComponent {
  PaymentType = PaymentType;
  payments: PaymentInfo[] = [];
  crossTotals: MoneyAmount[] = [];
  cashEntries: CashEntry[] = [];

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
    this.cashEntries = summary.cashEntries;
  }
}
