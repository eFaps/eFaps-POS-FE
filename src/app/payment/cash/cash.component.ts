import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { getLocaleNumberFormat, NumberFormatStyle, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import * as parseDecimalNumber from 'parse-decimal-number';

import { PaymentService } from '../../services/index';
import { Payment, PaymentType } from '../../model/index';

registerLocaleData(localeEs);

@Component({
  selector: 'app-cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.css']
})
export class CashComponent implements OnInit {
  paymentForm: FormGroup;
  payments: Payment[];

  constructor(private paymentService: PaymentService,
    private fb: FormBuilder) {
  }


  ngOnInit() {
    this.paymentForm = this.fb.group({
      'amount': ['0.00', Validators.min(0)],
    });
    this.paymentService.currentPayments.subscribe(_payments => this.payments = _payments);
  }

  addPayment() {
    const amount = Number(this.paymentForm.value.amount);
    if (amount > 0) {
      this.payments.push({
        type: PaymentType.CASH,
        amount: Number(this.paymentForm.value.amount)
      });
      this.paymentService.updatePayments(this.payments);
      this.paymentForm.setValue({ 'amount': 0 });
    }
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
    const customSeparators = { thousands: ',', decimal: '.' };
    const amountNum = parseDecimalNumber(amount, customSeparators);
    const amountStr = amountNum.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    this.paymentForm.patchValue({ 'amount': amountStr });
  }

  addNumber(_number: number) {
    console.log(getLocaleNumberFormat('es-MX', NumberFormatStyle.Decimal);
    const customSeparators = { thousands: ',', decimal: '.' };
    const amount = parseDecimalNumber(this.paymentForm.value.amount, customSeparators) + _number;
    const amountStr = amount.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    console.log(amountStr);
    this.paymentForm.patchValue({ 'amount': amountStr });
  }
}
