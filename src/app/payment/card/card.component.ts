import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Payment, PaymentType } from '../../model/index';
import { PaymentService, UtilsService } from '../../services/index';
import { PaymentForm } from '../payment-form';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent extends PaymentForm implements OnInit {
  PaymentType = PaymentType;
  paymentTypes = [PaymentType.DEBITCARD, PaymentType.CREDITCARD];

  constructor(paymentService: PaymentService, utilsService: UtilsService,
    fb: FormBuilder) {
    super(paymentService, utilsService, fb);
  }

  ngOnInit() {
    this.paymentForm = this.fb.group({
      'amount': ['0.00', Validators.min(0)],
      'paymentType': [PaymentType.DEBITCARD]
    });
    this.paymentService.currentPayments.subscribe(_payments => this.payments = _payments);
  }

  getPaymentType(): PaymentType {
    return this.paymentForm.value.paymentType;
  }
}
