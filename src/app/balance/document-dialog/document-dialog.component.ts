import { CdkScrollable } from "@angular/cdk/scrolling";
import { Component, OnInit, inject } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";
import { DocumentService } from "@efaps/pos-library";
import { TranslateService } from "@ngx-translate/core";

import { DocumentComponent } from "../../shared/document/document.component";

@Component({
  selector: "app-document-dialog",
  templateUrl: "./document-dialog.component.html",
  styleUrls: ["./document-dialog.component.scss"],
  imports: [MatDialogTitle, CdkScrollable, MatDialogContent, DocumentComponent],
})
export class DocumentDialogComponent implements OnInit {
  private documentService = inject(DocumentService);
  private translateService = inject(TranslateService);

  dialogRef = inject<MatDialogRef<DocumentDialogComponent>>(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);
  title = "";
  noDoc: boolean = false;

  ngOnInit() {
    switch (this.data.type) {
      case "RECEIPT":
        this.documentService.getReceipt(this.data.id).subscribe({
          next: (data) => {
            this.data = data;
            this.setTitle();
          },
        });
        break;
      case "INVOICE":
        this.documentService.getInvoice(this.data.id).subscribe({
          next: (data) => {
            this.data = data;
            this.setTitle();
          },
        });
        break;
      case "TICKET":
        this.documentService.getTicket(this.data.id).subscribe({
          next: (data) => {
            this.data = data;
            this.setTitle();
          },
        });
        break;
      case "CREDITNOTE":
        this.documentService.getCreditNote(this.data.id).subscribe({
          next: (data) => {
            this.data = data;
            this.setTitle();
          },
        });
        break;
      default:
        console.log("NO DOC?");
        this.noDoc = true;
    }
  }

  setTitle() {
    this.title = `${this.translateService.instant(this.data.type)}: ${this.data.number}`;
  }
}
