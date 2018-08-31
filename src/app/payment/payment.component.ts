import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EnumValues } from 'enum-values';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

import { Balance, Contact, DocStatus, Document, DocumentType, Payment, PaymentType } from '../model';
import { BalanceService, DocumentService, PaymentService, PrintService, WorkspaceService } from '../services';
import { PrintDialogComponent } from '../shared/print-dialog/print-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnDestroy {
  DocumentType = DocumentType;
  PaymentType = PaymentType;
  document: Document;
  payments: Payment[];
  total = 0;
  change = 0;
  docType: DocumentType = DocumentType.RECEIPT;
  docTypes: string[] = [];
  busy: Subscription;
  contact: Contact;
  workspaceOid: string;
  balance: Balance;
  showContact = false;
  permitToggleContact = true;
  sub$: Subscription[] = [];
  allowPrintPreliminary = true;

  constructor(private router: Router,
    private translateService: TranslateService,
    private workspaceService: WorkspaceService,
    public paymentService: PaymentService,
    private documentService: DocumentService,
    private balanceService: BalanceService,
    private printService: PrintService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private fb: FormBuilder) {
  }


  ngOnInit() {
    this.sub$.push(this.paymentService.currentDocument.subscribe(_doc => this.document = _doc));
    this.sub$.push(this.paymentService.currentPayments.subscribe(_payments => this.payments = _payments));
    this.sub$.push(this.balanceService.currentBalance.subscribe(_balance => this.balance = _balance));
    this.sub$.push(this.paymentService.currentTotal.subscribe(_total => {
      this.total = _total;
      this.change = this.document ? _total - this.document.crossTotal : _total;
    }));
    this.sub$.push(this.workspaceService.currentWorkspace.subscribe(_data => {
      this.workspaceOid = _data.oid;
      this.allowPrintPreliminary = _data.printCmds.some(x => x.target === 'PRELIMINARY');
      this.docTypes = [];
      _data.docTypes.forEach((_value) => {
        this.docTypes.push(_value.toString());
      });
    }));
  }

  ngOnDestroy() {
    this.sub$.forEach(_sub => _sub.unsubscribe());
  }

  validate() {
    let ret = true;
    if (DocumentType.INVOICE === this.docType && this.contact == null) {
      this.snackBar.open(this.translateService.instant('PAYMENT.NOCONTACTMSG'), '', { duration: 3000 });
      ret = false;
    } else if (DocumentType.RECEIPT === this.docType
        && this.contact == null
        && this.document.crossTotal > 700) {
      this.snackBar.open(this.translateService.instant('PAYMENT.NOCONTACTMSG'), '', { duration: 3000 });
      ret = false;
    }
    return ret;
  }

  createDocument() {
    if (this.validate()) {

      if (this.change !== 0) {
        this.payments.push({
          type: PaymentType.CHANGE,
          amount: this.change
        });
      }

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
        taxes: this.document.taxes,
        contactOid: this.contact ? (this.contact.oid ? this.contact.oid : this.contact.id) : null,
        workspaceOid: this.workspaceOid,
        balanceOid: this.balance.oid ? this.balance.oid : this.balance.id
      };

      switch (this.docType) {
        case DocumentType.RECEIPT:
          this.busy = this.documentService.createReceipt(document)
            .subscribe(_doc => {
              delete this.document['spot'];
              this.documentService.updateOrder(Object.assign(this.document, { status: DocStatus.CLOSED })).subscribe();
              this.router.navigate(['/pos']);
              this.showConfirm(_doc, DocumentType.RECEIPT);
              this.paymentService.reset();
            });
          break;
        case DocumentType.INVOICE:
          this.busy = this.documentService.createInvoice(document)
            .subscribe(_doc => {
              delete this.document['spot'];
              this.documentService.updateOrder(Object.assign(this.document, { status: DocStatus.CLOSED })).subscribe();
              this.router.navigate(['/pos']);
              this.showConfirm(_doc, DocumentType.INVOICE);
              this.paymentService.reset();
            });
          break;
        case DocumentType.TICKET:
          this.busy = this.documentService.createTicket(document)
            .subscribe(_doc => {
              delete this.document['spot'];
              this.documentService.updateOrder(Object.assign(this.document, { status: DocStatus.CLOSED })).subscribe();
              this.router.navigate(['/pos']);
              this.showConfirm(_doc, DocumentType.TICKET);
              this.paymentService.reset();
            });
          break;
      }
    }
  }

  showConfirm(_document: Document, docType: DocumentType) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      disableClose: false,
      data: {
        document: _document,
        docType: docType,
        change: this.change,
        currency: this.paymentService.currency
      }
    });
  }

  delPayment(_payment: Payment) {
    const index: number = this.payments.indexOf(_payment);
    if (index !== -1) {
      this.payments.splice(index, 1);
    }
    this.paymentService.updatePayments(this.payments);
  }

  selectContact(_contact: Contact) {
    this.contact = _contact;
  }

  toggleContact() {
    this.showContact = !this.showContact;
  }

  setDocType(_docTypeIdx) {
    if (DocumentType.INVOICE === _docTypeIdx) {
      this.showContact = true;
      this.permitToggleContact = false;
    } else {
      this.permitToggleContact = true;
    }
  }

  printPreliminary() {
    const dialogRef = this.dialog.open(PrintDialogComponent, {
      data: this.printService.printPreliminary(this.workspaceOid, this.document)
    });
  }
}
