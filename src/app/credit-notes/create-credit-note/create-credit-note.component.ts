import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CreditNote, DocumentService, Document } from "@efaps/pos-library";
import clone from "just-clone";

@Component({
  selector: "app-create-credit-note",
  templateUrl: "./create-credit-note.component.html",
  styleUrls: ["./create-credit-note.component.scss"],
})
export class CreateCreditNoteComponent implements OnInit {
  sourceDocument: Document;
  creditNote: CreditNote;

  constructor(
    private route: ActivatedRoute,
    private documentService: DocumentService
  ) {}

  ngOnInit(): void {
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
      balanceOid: null,
      payments: [],
      type: "CREDITNOTE",
      oid: null,
      number: null,
    };
  }

  createCreditNote() {
    this.documentService.createCreditNote(this.creditNote).subscribe({
      next: (creditNote) => console.log(creditNote),
    });
  }
}
