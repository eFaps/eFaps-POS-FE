import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import {
  Balance,
  BalanceService,
  CreditNote,
  DocumentService,
  Payable,
  Payment,
  PaymentService,
  PaymentType,
  WorkspaceService,
} from "@efaps/pos-library";
import clone from "just-clone";
import { AddPaymentDialogComponent } from "../add-payment-dialog/add-payment-dialog.component";
import { SuccessDialogComponent } from "../success-dialog/success-dialog.component";

@Component({
  selector: "app-create-credit-note",
  templateUrl: "./create-credit-note.component.html",
  styleUrls: ["./create-credit-note.component.scss"],
  standalone: false,
})
export class CreateCreditNoteComponent implements OnInit {
  sourceDocument!: Payable;
  creditNote!: CreditNote;
  balance!: Balance;
  payments: Payment[] = [];
  PaymentType = PaymentType;
  workspaceOid!: string;
  print: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private documentService: DocumentService,
    private balanceService: BalanceService,
    private workspaceService: WorkspaceService,
    public paymentService: PaymentService,
  ) {}

  ngOnInit(): void {
    this.balanceService.currentBalance.subscribe(
      (_balance) => (this.balance = _balance),
    );
    this.workspaceService.currentWorkspace.subscribe((_data) => {
      this.workspaceOid = _data.oid;
      this.print = _data.printCmds.some((x) => x.target === "TICKET");
    });
    this.route.queryParams.subscribe((params) => {
      const sourceId = params["sourceId"];
      const sourceType = params["sourceType"];
      switch (sourceType) {
        case "RECEIPT":
          this.documentService.getReceipt(sourceId).subscribe({
            next: (receipt) => {
              this.sourceDocument = receipt;
              this.initCreditNote();
            },
          });
          break;
        case "INVOICE":
          this.documentService.getInvoice(sourceId).subscribe({
            next: (invoice) => {
              this.sourceDocument = invoice;
              this.initCreditNote();
            },
          });
          break;
      }
    });
  }

  initCreditNote() {
    this.creditNote = {
      ...clone(this.sourceDocument),
      balanceOid: this.balance.oid ? this.balance.oid : this.balance.id,
      type: "CREDITNOTE",
      sourceDocOid: "",
      payments: [],
      id: null,
      oid: null,
      number: null,
    };
    this.sourceDocument.payments.forEach((payment) => {
      payment.amount = -payment.amount;
      this.payments.push(payment);
    });
  }

  createCreditNote() {
    this.creditNote.sourceDocOid = this.sourceDocument.oid
      ? this.sourceDocument.oid
      : this.sourceDocument.id!;
    this.creditNote.payments = this.payments;
    this.documentService.createCreditNote(this.creditNote).subscribe({
      next: (doc) => {
        this.router.navigate(["/balance"]);
        this.showSuccess(doc);
      },
    });
  }

  showSuccess(document: CreditNote) {
    this.dialog.open(SuccessDialogComponent, {
      width: "450px",
      disableClose: false,
      data: {
        document: document,
        currency: this.paymentService.currency,
        print: this.print,
        workspaceOid: this.workspaceOid,
      },
    });
  }

  delPayment(_payment: Payment) {
    const index: number = this.payments.indexOf(_payment);
    if (index !== -1) {
      this.payments.splice(index, 1);
    }
  }

  openPaymentDialog() {
    let amount = this.sourceDocument.crossTotal;
    this.payments.forEach((payment) => {
      amount = amount + payment.amount;
    });
    let dialogRef = this.dialog.open(AddPaymentDialogComponent, {
      data: amount,
    });
    dialogRef.afterClosed().subscribe({
      next: (info) => {
        this.payments.push({
          amount: -info.amount,
          currency: this.creditNote.currency,
          exchangeRate: this.creditNote.exchangeRate,
          type: info.paymentType,
        });
      },
    });
  }
}
