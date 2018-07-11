import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Subscriber } from 'rxjs/Subscriber';

import { Balance, Document, Payment } from '../model/index';
import { PosService } from './pos.service';

@Injectable()
export class PaymentService {

  private document: Document;
  private documentSource = new BehaviorSubject<Document>(this.document);
  currentDocument = this.documentSource.asObservable();

  private payments: Payment[] = [];
  private paymentsSource = new BehaviorSubject<Payment[]>(this.payments);
  currentPayments = this.paymentsSource.asObservable();

  private total = 0;
  private totalSource = new BehaviorSubject<number>(this.total);
  currentTotal = this.totalSource.asObservable();

  private balance: Balance;
  private balanceSource = new BehaviorSubject<Balance>(this.balance);
  currentBalance = this.balanceSource.asObservable();
  
  currency: string;

  constructor(private posService: PosService) {
    this.posService.currentCurrency.subscribe(_data => {
      if (_data) {
        this.currency = _data;
      }
    });
  }

  updateDocument(_doc: Document) {
    this.documentSource.next(_doc);
  }

  updatePayments(_payments: Payment[]) {
    this.calculateTotals(_payments);
    this.paymentsSource.next(_payments);
  }

  calculateTotals(_payments: Payment[]) {
    let total = 0;
    _payments.forEach((_payment: Payment) => {
      total += _payment.amount;
    });
    this.totalSource.next(total);
  }

  reset() {
    this.paymentsSource.next([]);
    this.documentSource.next(null);
    this.totalSource.next(0);
  }
}
