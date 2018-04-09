import { Component, OnInit } from '@angular/core';
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

  constructor(private paymentService: PaymentService, private fb: FormBuilder) { }


  ngOnInit() {
    this.paymentForm = this.fb.group({
      'amount': [16, Validators.min(0)],
    });
    this.paymentService.currentPayments.subscribe(_payments => this.payments = _payments);
  }

  addPayment() {
      this.payments.push({
          type: PaymentType.CASH
      });
      this.paymentService.updatePayments(this.payments);
  }

}
