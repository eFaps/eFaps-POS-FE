import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { PaymentService } from '../services/index';
import { Document, PaymentType } from '../model/index';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  document: Document;
  paymentTypes: string[] = [];
  paymentForm: FormGroup;

  constructor(private paymentService: PaymentService, private fb: FormBuilder) {}


  ngOnInit() {
    for (const paymentType in PaymentType) {
      if (isNaN(Number(paymentType))) {
        this.paymentTypes.push(paymentType);
      }
    }
    this.paymentForm = this.fb.group({
      'amount': [16, Validators.min(0)],
    });
    this.paymentService.currentDocument.subscribe(_doc => this.document = _doc);
  }
}
