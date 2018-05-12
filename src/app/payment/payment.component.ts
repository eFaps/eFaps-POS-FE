import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { EnumValues, EnumValueType } from 'enum-values';
import { Subscription } from 'rxjs/Subscription';

import { DocStatus, Document, DocumentType, Payment, PaymentType } from '../model/index';
import { DocumentService, PaymentService, WorkspaceService } from '../services/index';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  DocumentType = DocumentType;
  PaymentType = PaymentType;
  document: Document;
  payments: Payment[];
  total = 0;
  change = 0;
  docType: DocumentType = DocumentType.RECEIPT;
  docTypes: string[] = [];
  busy: Subscription;

  constructor(private router: Router, private workspaceService: WorkspaceService,
    public paymentService: PaymentService,
    private documentService: DocumentService, private dialog: MatDialog,
    private fb: FormBuilder) {
  }


  ngOnInit() {
    this.paymentService.currentDocument.subscribe(_doc => this.document = _doc);
    this.paymentService.currentPayments.subscribe(_payments => this.payments = _payments);
    this.paymentService.currentTotal.subscribe(_total => {
      this.total = _total;
      this.change = this.document ? _total - this.document.crossTotal : _total;
    });
    this.workspaceService.currentWorkspace.subscribe(_data => {
      this.docTypes = [];
      _data.docTypes.forEach((_value) => {
        this.docTypes.push(_value.toString());
      });
    });
  }

  createDocument() {
    const document = {
      id: null,
      oid: null,
      number: null,
      currency: this.document.currency,
      items: this.document.items,
      status: DocStatus.OPEN,
      payments: this.payments,
      netTotal: this.document.netTotal,
      crossTotal: this.document.crossTotal,
      taxes: this.document.taxes
    };

    switch (this.docType) {
      case DocumentType.RECEIPT:
        this.busy = this.documentService.createReceipt(document)
          .subscribe(_receipt => {
            this.documentService.updateOrder(Object.assign(this.document, { status: DocStatus.CLOSED })).subscribe();
            this.router.navigate(['/pos']);
            const dialogRef = this.dialog.open(ConfirmDialogComponent, {
              width: '450px',
              disableClose: false,
              data: {
                document: _receipt,
                docType: DocumentType.RECEIPT
              }
            });
            this.paymentService.reset();
          });
        break;
      case DocumentType.INVOICE:
        this.busy = this.documentService.createInvoice(document)
          .subscribe(_receipt => {
            this.documentService.updateOrder(Object.assign(this.document, { status: DocStatus.CLOSED })).subscribe();
            this.router.navigate(['/pos']);
            const dialogRef = this.dialog.open(ConfirmDialogComponent, {
              width: '450px',
              disableClose: false,
              data: {
                document: _receipt,
                docType: DocumentType.INVOICE
              }
            });
            this.paymentService.reset();
          });
        break;
      case DocumentType.TICKET:
        this.busy = this.documentService.createTicket(document)
          .subscribe(_receipt => {
            this.documentService.updateOrder(Object.assign(this.document, { status: DocStatus.CLOSED })).subscribe();
            this.router.navigate(['/pos']);
            const dialogRef = this.dialog.open(ConfirmDialogComponent, {
              width: '450px',
              disableClose: false,
              data: {
                document: _receipt,
                docType: DocumentType.TICKET
              }
            });
            this.paymentService.reset();
          });
        break;
    }
  }

  delPayment(_payment: Payment) {
    const index: number = this.payments.indexOf(_payment);
    if (index !== -1) {
      this.payments.splice(index, 1);
    }
    this.paymentService.updatePayments(this.payments);
  }
}
