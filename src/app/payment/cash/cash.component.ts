import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { PaymentService, UtilsService } from '../../services/index';
import { PaymentType } from '../../model/index';
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

  getPaymentType(): PaymentType {
    return PaymentType.CASH;
  }

  addNumber(_number: number) {
    const amount = this.utilsService.parse(this.paymentForm.value.amount) + _number;
    const amountStr = this.utilsService.toString(amount);
    this.paymentForm.patchValue({ 'amount': amountStr });
  }
}
