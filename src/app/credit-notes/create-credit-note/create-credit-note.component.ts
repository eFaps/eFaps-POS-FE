import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Balance, CreditNote, DocumentService, Document, BalanceService } from "@efaps/pos-library";
import clone from "just-clone";

@Component({
  selector: "app-create-credit-note",
  templateUrl: "./create-credit-note.component.html",
  styleUrls: ["./create-credit-note.component.scss"],
})
export class CreateCreditNoteComponent implements OnInit {
  sourceDocument: Document;
  creditNote: CreditNote;
  balance: Balance;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private documentService: DocumentService,
    private balanceService: BalanceService
  ) {}

  ngOnInit(): void {
    this.balanceService.currentBalance.subscribe(
      (_balance) => (this.balance = _balance)
    )
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
      baseDocOid: this.sourceDocument.oid ? this.sourceDocument.oid : this.sourceDocument.id,
      payments: [],
      type: "CREDITNOTE",
      id: null,
      oid: null,
      number: null,
    };
  }

  createCreditNote() {
    this.documentService.createCreditNote(this.creditNote).subscribe({
      next: (creditNote) => {
        this.router.navigate(["/balance"]);
      }
    });
  }
}
