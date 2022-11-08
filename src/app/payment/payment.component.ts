import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTabGroup } from "@angular/material/tabs";
import { Router } from "@angular/router";
import { LocalStorage } from "@efaps/ngx-store";
import {
  Balance,
  BalanceService,
  Contact,
  ContactService,
  DocStatus,
  Document,
  DocumentService,
  DocumentType,
  Invoice,
  Payment,
  PaymentService,
  PaymentType,
  PrintService,
  Receipt,
  Ticket,
  WorkspaceService,
} from "@efaps/pos-library";
import { TranslateService } from "@ngx-translate/core";
import { PartialObserver, Subscription } from "rxjs";

import { ConfirmDialogComponent } from "../shared/confirm-dialog/confirm-dialog.component";
import { DocumentComponent } from "../shared/document/document.component";
import { PrintDialogComponent } from "../shared/print-dialog/print-dialog.component";
import { DiscountComponent } from "./discount/discount.component";
import { SuccessDialogComponent } from "./success-dialog/success-dialog.component";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.scss"],
})
export class PaymentComponent implements OnInit, OnDestroy {
  @ViewChild(MatTabGroup, { static: true }) tabGroup!: MatTabGroup;
  @ViewChild(DocumentComponent, { static: true })
  documentComponent!: DocumentComponent;
  @LocalStorage() selectedPaymentTypeItem: number = 0;
  DocumentType = DocumentType;
  PaymentType = PaymentType;
  document!: Document;
  payments: Payment[] = [];
  total = 0;
  change = 0;
  docType: DocumentType = DocumentType.RECEIPT;
  docTypes: DocumentType[] = [];
  busy!: Subscription;
  contact: Contact | undefined;
  workspaceOid!: string;
  balance!: Balance;
  showContact = false;
  permitToggleContact = true;
  private subscriptions$ = new Subscription();
  allowPrintPreliminary = true;
  private printTicket = false;

  constructor(
    private router: Router,
    private translateService: TranslateService,
    private workspaceService: WorkspaceService,
    public paymentService: PaymentService,
    private documentService: DocumentService,
    private balanceService: BalanceService,
    private printService: PrintService,
    private contactService: ContactService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.subscriptions$.add(
      this.paymentService.currentDocument.subscribe((_doc) => {
        this.document = _doc;
        this.documentComponent.document = _doc;
        if (this.document.contactOid) {
          this.showContact = true;
          if ((this.document as any).contact) {
            this.contact = (this.document as any).contact;
          } else {
            this.contactService.getContact(this.document.contactOid).subscribe({
              next: (contact) => (this.contact = contact),
            });
          }
        }
      })
    );
    this.subscriptions$.add(
      this.paymentService.currentPayments.subscribe(
        (_payments) => (this.payments = _payments)
      )
    );
    this.subscriptions$.add(
      this.balanceService.currentBalance.subscribe(
        (_balance) => (this.balance = _balance)
      )
    );
    this.subscriptions$.add(
      this.paymentService.currentTotal.subscribe((_total) => {
        this.total = _total;
        this.change = this.document
          ? _total - this.document.crossTotal
          : _total;
      })
    );
    this.subscriptions$.add(
      this.workspaceService.currentWorkspace.subscribe((_data) => {
        this.workspaceOid = _data.oid;
        this.allowPrintPreliminary = _data.printCmds.some(
          (x) => x.target === "PRELIMINARY"
        );
        this.printTicket = _data.printCmds.some((x) => x.target === "TICKET");
        this.docTypes = [];
        _data.docTypes.forEach((_value) => {
          if (_value != DocumentType.CREDITNOTE) {
            this.docTypes.push(_value);
          }
        });
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions$.unsubscribe();
  }

  validate() {
    let ret = true;
    if (DocumentType.INVOICE === this.docType && this.contact == null) {
      this.snackBar.open(
        this.translateService.instant("PAYMENT.NOCONTACTMSG"),
        "",
        { duration: 3000 }
      );
      ret = false;
    } else if (
      DocumentType.RECEIPT === this.docType &&
      this.contact == null &&
      this.document.crossTotal > 700
    ) {
      this.snackBar.open(
        this.translateService.instant("PAYMENT.NOCONTACTMSG"),
        "",
        { duration: 3000 }
      );
      ret = false;
    }
    return ret;
  }

  createDocument() {
    if (this.validate()) {
      if (this.change !== 0) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          width: "300px",
          data: {
            title: this.translateService.instant("PAYMENT.CONFIRM-CLOSE"),
          },
        });
        dialogRef.afterClosed().subscribe((result) => {
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
        amount: this.change,
        currency: this.document.currency,
        exchangeRate: this.document.exchangeRate,
      });
    }
    const payable = {
      id: null,
      oid: null,
      number: null,
      currency: this.document.currency,
      exchangeRate: this.document.exchangeRate,
      items: this.document.items,
      status: DocStatus.OPEN,
      payments: this.payments,
      netTotal: this.document.netTotal,
      crossTotal: this.document.crossTotal,
      taxes: this.document.taxes,
      contactOid: this.contact
        ? this.contact.oid
          ? this.contact.oid
          : this.contact.id
        : null,
      workspaceOid: this.workspaceOid,
      balanceOid: this.balance.oid ? this.balance.oid : this.balance.id,
      discount: this.document.discount,
    };

    switch (this.docType) {
      case DocumentType.RECEIPT:
        this.busy = this.documentService
          .createReceipt(this.document.id!, <Receipt>payable)
          .subscribe(this.getObserver<Receipt>(DocumentType.RECEIPT));
        break;
      case DocumentType.INVOICE:
        this.busy = this.documentService
          .createInvoice(this.document.id!, <Invoice>payable)
          .subscribe(this.getObserver<Invoice>(DocumentType.INVOICE));
        break;
      case DocumentType.TICKET:
        this.busy = this.documentService
          .createTicket(this.document.id!, <Ticket>payable)
          .subscribe(this.getObserver<Ticket>(DocumentType.TICKET));
        break;
    }
  }

  private getObserver<T extends Document>(
    type: DocumentType
  ): PartialObserver<T> {
    return {
      next: (doc) => {
        this.router.navigate(["/pos"]);
        this.showSuccess(doc, type);
        this.paymentService.reset();
      },
      error: (response) => {
        if (response && response.error && response.error.status) {
          this.snackBar.open(
            this.translateService.instant("PAYMENT." + response.error.status),
            "",
            { duration: 3000 }
          );
        } else {
          this.snackBar.open(
            this.translateService.instant("PAYMENT.UNKNOWNERROR"),
            "",
            { duration: 3000 }
          );
        }
      },
    };
  }

  showSuccess(document: Document, docType: DocumentType) {
    this.dialog.open(SuccessDialogComponent, {
      width: "450px",
      disableClose: false,
      data: {
        document: document,
        docType: docType,
        change: this.change,
        currency: this.paymentService.currency,
        print: this.printTicket,
        workspaceOid: this.workspaceOid,
      },
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

  setDocType(_docTypeIdx: DocumentType) {
    if (DocumentType.INVOICE === _docTypeIdx) {
      this.showContact = true;
      this.permitToggleContact = false;
    } else {
      this.permitToggleContact = true;
    }
  }

  printPreliminary() {
    this.dialog.open(PrintDialogComponent, {
      data: this.printService.printPreliminary(
        this.workspaceOid,
        this.document
      ),
    });
  }

  selectPaymentType(_index: number) {
    this.selectedPaymentTypeItem = _index;
  }

  showDiscount() {
    if ("discount" in this.document) {
      this.dialog
        .open(DiscountComponent, {
          data: this.document,
        })
        .afterClosed()
        .subscribe({
          next: () => {
            this.paymentService.calculateTotals(this.payments);
          },
        });
    }
  }
}
