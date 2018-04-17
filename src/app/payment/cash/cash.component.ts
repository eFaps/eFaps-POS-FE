import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { PaymentService } from '../../services/index';
import { Payment, PaymentType } from '../../model/index';

@Component({
  selector: 'app-cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.css']
})
export class CashComponent implements OnInit {
  paymentForm: FormGroup;
  payments: Payment[];

  constructor(private paymentService: PaymentService, private fb: FormBuilder) {
  }


  ngOnInit() {
    this.paymentForm = this.fb.group({
      'amount': [16, Validators.min(0)],
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
    amount = amount.replace(/\./g, '').replace(/^0+/, '');
    if (amount.length > 2) {
      amount = amount.substr(0, amount.length - 2) + '.' + amount.substr(-2, 2);
    } else if (amount.length === 1) {
      amount = '0.0' + amount;
    } else {
      amount = '0.' + amount;
    }
    this.paymentForm.patchValue({ 'amount': amount });
  }
}
