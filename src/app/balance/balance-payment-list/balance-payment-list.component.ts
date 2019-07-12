import { Component, Input } from '@angular/core';

import { Payable, Payment, PaymentType } from '../../model';
import { Decimal } from 'decimal.js';


@Component({
  selector: 'app-balance-payment-list',
  templateUrl: './balance-payment-list.component.html',
  styleUrls: ['./balance-payment-list.component.scss']
})
export class BalancePaymentListComponent {
  PaymentType = PaymentType;
  payments: Payment[] = [];
  total = 0;

  constructor() { }

  @Input()
  set payables(payables: Payable[]) {
    this.total = 0;
    this.payments = [];
    const paymentMap = new Map<PaymentType, Payment>();
    payables.forEach(payable => {
      payable.payments.forEach(payment => {
        let currentPayment;
        if (paymentMap.has(payment.type)) {
          currentPayment = paymentMap.get(payment.type);
        } else {
          currentPayment = { type: payment.type, amount: 0 };
          paymentMap.set(payment.type, currentPayment);
        }
        let amount = new Decimal(payment.amount);
        const paymentType: PaymentType = payment.type;
        if (paymentType.toString() === PaymentType[PaymentType.CHANGE]) {
          amount = amount.neg();
        }
        currentPayment.amount = new Decimal(currentPayment.amount).plus(amount)
          .toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toNumber();
        this.total = new Decimal(this.total).plus(amount)
          .toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toNumber();
      });
    });
    Array.from(paymentMap.values()).forEach(_payment => this.payments.push(_payment));
  }
}
