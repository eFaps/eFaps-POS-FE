import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  Balance,
  CreditNote,
  DocumentService,
  BalanceService,
  Payment,
  Payable,
  PaymentService,
  PaymentType,
} from "@efaps/pos-library";
import clone from "just-clone";

@Component({
  selector: "app-create-credit-note",
  templateUrl: "./create-credit-note.component.html",
  styleUrls: ["./create-credit-note.component.scss"],
})
export class CreateCreditNoteComponent implements OnInit {
  sourceDocument: Payable;
  creditNote: CreditNote;
  balance: Balance;
  payments: Payment[] = [];
  PaymentType = PaymentType;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private documentService: DocumentService,
    private balanceService: BalanceService,
    public paymentService: PaymentService,
  ) { }

  ngOnInit(): void {
    this.balanceService.currentBalance.subscribe(
      (_balance) => (this.balance = _balance)
    );
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
      sourceDocOid: null,
      payments: [],
      id: null,
      oid: null,
      number: null,
    };
    this.sourceDocument.payments.forEach(payment => {
      payment.amount = - payment.amount
      this.payments.push(payment)
    })
  }

  createCreditNote() {
    this.creditNote.sourceDocOid = this.sourceDocument.oid ? this.sourceDocument.oid : this.sourceDocument.id
    this.creditNote.payments = this.payments
    this.documentService.createCreditNote(this.creditNote).subscribe({
      next: () => {
        this.router.navigate(["/balance"]);
      },
    });
  }

  delPayment(_payment: Payment) {
    const index: number = this.payments.indexOf(_payment);
    if (index !== -1) {
      this.payments.splice(index, 1);
    }
  }
}
