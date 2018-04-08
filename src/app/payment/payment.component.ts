import { Component, OnInit } from '@angular/core';

import { PaymentService } from '../services/index';
import { Document } from '../model/index';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  document: Document;
  constructor(private paymentService: PaymentService) { }

  ngOnInit() {
    this.paymentService.currentDocument.subscribe(_doc => this.document = _doc);
  }
}
