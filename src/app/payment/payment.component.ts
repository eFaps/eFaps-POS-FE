import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';

import { EnumValues } from 'enum-values';

import { DocumentService, PaymentService } from '../services/index';
import { Document, DocStatus, DocumentType, Payment, PaymentType } from '../model/index';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

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

  constructor(private router: Router, private paymentService: PaymentService,
    private documentService: DocumentService, private dialog: MatDialog,
    private fb: FormBuilder) {
  }


  ngOnInit() {
    this.paymentService.currentDocument.subscribe(_doc => this.document = _doc);
    this.paymentService.currentPayments.subscribe(_payments => this.payments = _payments);
    this.paymentService.currentTotal.subscribe(_total => this.total = _total);
  }

  createDocument() {
    switch (this.docType) {
      case DocumentType.INVOICE:
        this.documentService.createInvoice(this.document)
          .subscribe(_invoice => this.router.navigate(['/pos']));
        break;
      case DocumentType.RECEIPT:
        this.documentService.updateOrder(Object.assign(this.document, { status: DocStatus.CLOSED })).subscribe();
        const receipt = {
          id: null,
          oid: null,
          number: null,
          items: this.document.items,
          status: DocStatus.OPEN,
          payments: this.payments
        };

        this.documentService.createReceipt(receipt)
          .subscribe(_receipt => this.router.navigate(['/pos']));
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          width: '450px',
          disableClose: false,
          data: {}
        });
        break;
    }
  }
}
