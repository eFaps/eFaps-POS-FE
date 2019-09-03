import { Component, Input } from '@angular/core';

import { PaymentType, BalanceSummary, PaymentInfo } from '../../model';

@Component({
  selector: 'app-balance-payment-list',
  templateUrl: './balance-payment-list.component.html',
  styleUrls: ['./balance-payment-list.component.scss']
})
export class BalancePaymentListComponent {
  PaymentType = PaymentType;
  payments: PaymentInfo[] = [];
  total = 0;

  constructor() { }

  @Input()
  set summary(summary: BalanceSummary) {
    this.total = 0;
    this.payments = [];
    if (summary) {
      summary.detail.paymentInfos.forEach(paymentInfo => {
        this.payments.push(paymentInfo)
      });
      this.total = summary.detail.crossTotal;
    }
  }
}
