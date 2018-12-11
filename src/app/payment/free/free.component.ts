import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { PaymentType } from '../../model/index';
import { PaymentService, UtilsService } from '../../services/index';
import { PaymentForm } from '../payment-form';

@Component({
  selector: 'app-free',
  templateUrl: './free.component.html',
  styleUrls: ['./free.component.scss']
})
export class FreeComponent extends PaymentForm {

  constructor(paymentService: PaymentService, utilsService: UtilsService,
    fb: FormBuilder) {
    super(paymentService, utilsService, fb);
  }

  getPaymentType(): PaymentType {
    return PaymentType.FREE;
  }
}
