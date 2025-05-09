import { Component, OnInit, inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DocumentService } from "@efaps/pos-library";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-document-dialog",
  templateUrl: "./document-dialog.component.html",
  styleUrls: ["./document-dialog.component.scss"],
  standalone: false,
})
export class DocumentDialogComponent implements OnInit {
  private documentService = inject(DocumentService);
  private translateService = inject(TranslateService);

  dialogRef = inject<MatDialogRef<DocumentDialogComponent>>(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);
  title = "";

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
    }
  }

  setTitle() {
    this.title = `${this.translateService.instant(this.data.type)}: ${this.data.number}`;
  }
}
