import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { PaymentService } from '../../services/index';
import { Document, DocItem } from '../../model/index';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  displayedColumns = ['index'];
  dataSource = new MatTableDataSource<DocItem>();
  document: Document;

  constructor(private paymentService: PaymentService) { }

  ngOnInit() {
    this.paymentService.currentDocument.subscribe(_doc => {
        this.document = _doc;
        this.dataSource.data = _doc.items;
    });
  }

}
