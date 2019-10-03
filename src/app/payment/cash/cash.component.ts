import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Payment, PaymentService, PaymentType, UtilsService } from '@efaps/pos-library';

import { PaymentForm } from '../payment-form';

@Component({
  selector: 'app-cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.scss']
})
export class CashComponent extends PaymentForm {

  constructor(paymentService: PaymentService, utilsService: UtilsService,
    fb: FormBuilder) {
    super(paymentService, utilsService, fb);
  }

  getPayment(): Payment {
    return { type: PaymentType.CASH, amount: 0 };
  }

  addNumber(_number: number) {
    const amount = this.utilsService.parse(this.paymentForm.value.amount) + _number;
    const amountStr = this.utilsService.toString(amount);
    this.paymentForm.patchValue({ 'amount': amountStr });
  }
}
