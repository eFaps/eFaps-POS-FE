import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Payment, PaymentType } from '../../model/index';
import { PaymentService, UtilsService } from '../../services/index';
import { PaymentForm } from '../payment-form';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent extends PaymentForm {

  constructor(paymentService: PaymentService, utilsService: UtilsService,
    fb: FormBuilder) {
    super(paymentService, utilsService, fb);
  }

  getPaymentType(): PaymentType {
    return PaymentType.CARD;
  }

}
