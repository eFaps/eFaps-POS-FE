import { Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Document, Payment, PaymentType } from '../model';
import { PaymentService, UtilsService } from '../services';

export abstract class PaymentForm implements OnInit, OnDestroy {
  public paymentForm: FormGroup;
  protected payments: Payment[];
  @Input() protected change: number;
  public currency: string;
  protected subscription$ = new Subscription();
  private document: Document;

  constructor(protected paymentService: PaymentService, protected utilsService: UtilsService,
    protected fb: FormBuilder) {
    this.currency = utilsService.getCurrencySymbol('PEN');
  }

  ngOnInit() {
    this.paymentForm = this.fb.group({
      'amount': ['0.00', Validators.min(0)],
    });
    this.subscription$.add(this.paymentService.currentDocument.subscribe(_doc => this.document = _doc));
    this.subscription$.add(this.paymentService.currentPayments
      .subscribe(_payments => this.payments = _payments));
    this.subscription$.add(this.paymentService.currentTotal.subscribe(_total => {
      this.change = this.document ? _total - this.document.crossTotal : _total;
    }));
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  setNumber(_number: string) {
    let amount: string;
    switch (_number) {
      case 'clear':
        amount = '0';
        break;
      default:
        amount = '' + this.paymentForm.value.amount + _number;
        break;
    }
    amount = amount.replace(/\./g, '').replace(/,/g, '').replace(/^0+/, '');
    if (amount.length > 2) {
      amount = amount.substr(0, amount.length - 2) + '.' + amount.substr(-2, 2);
    } else if (amount.length === 1) {
      amount = '0.0' + amount;
    } else {
      amount = '0.' + amount;
    }

    const amountNum = this.utilsService.parse(amount);
    const amountStr = this.utilsService.toString(amountNum);
    this.paymentForm.patchValue({ 'amount': amountStr });
  }

  setChange() {
    if (this.change < 0) {
      const amountStr = this.utilsService.toString(-this.change);
      this.paymentForm.patchValue({ 'amount': amountStr });
    }
  }

  addPayment() {
    const amount = this.utilsService.parse(this.paymentForm.value.amount);
    if (amount > 0) {
      this.payments.push({
        type: this.getPaymentType(),
        amount: amount
      });
      this.paymentService.updatePayments(this.payments);
      this.paymentForm.setValue({ 'amount': 0 });
      this.setNumber('0');
    }
  }

  abstract getPaymentType(): PaymentType;
}
