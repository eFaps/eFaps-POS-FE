import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DocumentService } from '../../services';

@Component({
  selector: 'app-document-dialog',
  templateUrl: './document-dialog.component.html',
  styleUrls: ['./document-dialog.component.scss']
})
export class DocumentDialogComponent implements OnInit {
  constructor(private documentService: DocumentService,
    public dialogRef: MatDialogRef<DocumentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    switch (this.data.type) {
      case 'RECEIPT':
        this.documentService.getReceipt(this.data.id).subscribe({
          next: data => this.data = data
        })
        break;
      case 'INVOICE':
        this.documentService.getInvoice(this.data.id).subscribe({
          next: data => this.data = data
        })
        break;
      case 'TICKET':
        this.documentService.getTicket(this.data.id).subscribe({
          next: data => this.data = data
        })
        break;
    }
  }
}
