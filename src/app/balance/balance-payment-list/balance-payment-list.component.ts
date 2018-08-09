import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Observable, Subscription } from 'rxjs/Rx';

import { Balance, Payable, Payment, PaymentType } from '../../model';
import { BalanceService, DocumentService } from '../../services';

@Component({
  selector: 'app-balance-payment-list',
  templateUrl: './balance-payment-list.component.html',
  styleUrls: ['./balance-payment-list.component.scss']
})
export class BalancePaymentListComponent implements OnInit, OnDestroy {
  PaymentType = PaymentType;
  payments: Payment[] = [];
  total = 0;
  currentBalance: Balance;
  sub$: Subscription;

  constructor(private balanceService: BalanceService,
    private documentService: DocumentService) { }

  ngOnInit() {
    this.sub$ = this.balanceService.currentBalance
      .subscribe(_balance => {
        this.payments = [];
        this.total = 0;
        this.currentBalance = _balance;
        if (_balance) {
          this.documentService.getDocuments4Balance(_balance).subscribe(_payables => {
            const paymentMap = new Map<PaymentType, Payment>();
            _payables.forEach(_payable => {
              _payable.payments.forEach(_payment => {
                let payment;
                if (paymentMap.has(_payment.type)) {
                  payment = paymentMap.get(_payment.type);
                } else {
                  payment = { type: _payment.type, amount: 0 };
                  paymentMap.set(_payment.type, payment);
                }
                let amount = _payment.amount;
                const paymentType: PaymentType = _payment.type;
                if (paymentType.toString() === PaymentType[PaymentType.CHANGE]) {
                  amount = -amount;
                }
                payment.amount = payment.amount + amount;
                this.total = this.total + amount;
              });
            });
            Array.from(paymentMap.values()).forEach(_payment => this.payments.push(_payment));
          });
        }
      });
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }
}
