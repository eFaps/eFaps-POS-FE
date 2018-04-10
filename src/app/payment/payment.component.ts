import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EnumValues } from 'enum-values';

import { PaymentService } from '../services/index';
import { Document, DocumentType, Payment, PaymentType } from '../model/index';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  DocumentType = DocumentType;
  document: Document;
  payments: Payment[];
  total: number;
  docType: DocumentType = DocumentType.RECEIPT;
  docTypes: string[] = EnumValues.getNames(DocumentType);

  constructor(private paymentService: PaymentService, private fb: FormBuilder) { }


  ngOnInit() {
    this.paymentService.currentDocument.subscribe(_doc => this.document = _doc);
    this.paymentService.currentPayments.subscribe(_payments => this.payments = _payments);
    this.paymentService.currentTotal.subscribe(_total => this.total = _total);
  }

  createDocument() {
      console.log(this.docType);
  }
}
