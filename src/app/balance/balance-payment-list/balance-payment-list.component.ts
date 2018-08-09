import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';

import { Balance, Payable, Payment, PaymentType } from '../../model';
import { BalanceService, DocumentService } from '../../services';

@Component({
  selector: 'app-balance-payment-list',
  templateUrl: './balance-payment-list.component.html',
  styleUrls: ['./balance-payment-list.component.scss']
})
export class BalancePaymentListComponent implements OnInit {
  PaymentType = PaymentType;
  payments: Payment[] = [];
  total = 0;
  currentBalance: Balance;

  constructor(private balanceService: BalanceService,
    private documentService: DocumentService) { }

  ngOnInit() {
    this.balanceService.currentBalance
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
                payment.amount = payment.amount + _payment.amount;
                this.total = this.total + _payment.amount;
              });
            });
            Array.from(paymentMap.values()).forEach(_payment => this.payments.push(_payment));
          });
        }
      });
  }
}
