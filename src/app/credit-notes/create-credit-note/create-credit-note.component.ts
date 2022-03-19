import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentService, Document } from '@efaps/pos-library';

@Component({
  selector: 'app-create-credit-note',
  templateUrl: './create-credit-note.component.html',
  styleUrls: ['./create-credit-note.component.scss']
})
export class CreateCreditNoteComponent implements OnInit {
  sourceDocument: Document;

  constructor(private route: ActivatedRoute, private documentService: DocumentService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const sourceId = params['sourceId'];
      const sourceType = params['sourceType'];
      switch (sourceType) {
        case  "RECEIPT":
          this.documentService.getReceipt(sourceId).subscribe({
            next: receipt => this.sourceDocument = receipt
          })
          break
        case  "INVOICE":
          this.documentService.getInvoice(sourceId).subscribe({
            next: invoice => this.sourceDocument = invoice
          })
          break
      }
    });
  }
}
