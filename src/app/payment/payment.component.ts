import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar, MatTabGroup } from '@angular/material';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorage } from 'ngx-store';
import { Subscription } from 'rxjs';

import {
  Balance,
  Contact,
  DocStatus,
  Document,
  DocumentType,
  Payment,
  PaymentType
} from '../model';
import {
  BalanceService,
  DocumentService,
  PaymentService,
  PrintService,
  WorkspaceService
} from '../services';
import { PrintDialogComponent } from '../shared/print-dialog/print-dialog.component';
import { SuccessDialogComponent } from './success-dialog/success-dialog.component';
import { DiscountComponent } from './discount/discount.component';
import { DocumentComponent } from '../shared/document/document.component';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnDestroy {
  @ViewChild(MatTabGroup, { static: true }) tabGroup: MatTabGroup;
  @ViewChild(DocumentComponent, { static: true }) documentComponent: DocumentComponent;
  @LocalStorage() selectedPaymentTypeItem: number = 0;
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
  private subscriptions$ = new Subscription();
  allowPrintPreliminary = true;
  private printTicket = false;

  constructor(private router: Router,
    private translateService: TranslateService,
    private workspaceService: WorkspaceService,
    public paymentService: PaymentService,
    private documentService: DocumentService,
    private balanceService: BalanceService,
    private printService: PrintService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.subscriptions$.add(this.paymentService.currentDocument.subscribe(_doc => {
      this.document = _doc;
      this.documentComponent.document = _doc;
    }));
    this.subscriptions$.add(this.paymentService.currentPayments.subscribe(_payments => this.payments = _payments));
    this.subscriptions$.add(this.balanceService.currentBalance.subscribe(_balance => this.balance = _balance));
    this.subscriptions$.add(this.paymentService.currentTotal.subscribe(_total => {
      this.total = _total;
      this.change = this.document ? _total - this.document.crossTotal : _total;
    }));
    this.subscriptions$.add(this.workspaceService.currentWorkspace.subscribe(_data => {
      this.workspaceOid = _data.oid;
      this.allowPrintPreliminary = _data.printCmds.some(x => x.target === 'PRELIMINARY');
      this.printTicket = _data.printCmds.some(x => x.target === 'TICKET');
      this.docTypes = [];
      _data.docTypes.forEach((_value) => {
        this.docTypes.push(_value.toString());
      });
    }));
  }

  ngOnDestroy() {
    this.subscriptions$.unsubscribe();
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
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          width: '300px',
          data: { title: this.translateService.instant('PAYMENT.CONFIRM-CLOSE') }
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.executeCreateDocument();
          }
        });
      } else {
        this.executeCreateDocument();
      }
    }
  }

  private executeCreateDocument() {
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
      balanceOid: this.balance.oid ? this.balance.oid : this.balance.id,
      discount: this.document.discount
    };

    switch (this.docType) {
      case DocumentType.RECEIPT:
        this.busy = this.documentService.createReceipt(document)
          .subscribe(_doc => {
            this.documentService.updateOrder(Object.assign(this.document,
              { status: DocStatus.CLOSED, discount: null, payableOid: _doc.id })).subscribe();
            this.router.navigate(['/pos']);
            this.showSuccess(_doc, DocumentType.RECEIPT);
            this.paymentService.reset();
          });
        break;
      case DocumentType.INVOICE:
        this.busy = this.documentService.createInvoice(document)
          .subscribe(_doc => {
            this.documentService.updateOrder(Object.assign(this.document,
              { status: DocStatus.CLOSED, discount: null, payableOid: _doc.id })).subscribe();
            this.router.navigate(['/pos']);
            this.showSuccess(_doc, DocumentType.INVOICE);
            this.paymentService.reset();
          });
        break;
      case DocumentType.TICKET:
        this.busy = this.documentService.createTicket(document)
          .subscribe(_doc => {
            this.documentService.updateOrder(Object.assign(this.document,
              { status: DocStatus.CLOSED, discount: null, payableOid: _doc.id })).subscribe();
            this.router.navigate(['/pos']);
            this.showSuccess(_doc, DocumentType.TICKET);
            this.paymentService.reset();
          });
        break;
    }
  }


  showSuccess(document: Document, docType: DocumentType) {
    this.dialog.open(SuccessDialogComponent, {
      width: '450px',
      disableClose: false,
      data: {
        document: document,
        docType: docType,
        change: this.change,
        currency: this.paymentService.currency,
        print: this.printTicket,
        workspaceOid: this.workspaceOid
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
    this.dialog.open(PrintDialogComponent, {
      data: this.printService.printPreliminary(this.workspaceOid, this.document)
    });
  }

  selectPaymentType(_index: number) {
    this.selectedPaymentTypeItem = _index;
  }

  showDiscount() {
    if ('discount' in this.document) {
      this.dialog.open(DiscountComponent, {
        data: this.document
      }).afterClosed().subscribe({
        next: () => {
          this.paymentService.calculateTotals(this.payments);
        }
      });
    }
  }
}
