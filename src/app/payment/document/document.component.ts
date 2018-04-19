import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Router } from '@angular/router';

import { PaymentService } from '../../services/index';
import { Document, DocItem, Tax, TaxEntry } from '../../model/index';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  displayedColumns = ['index', 'quantity', 'productDesc', 'crossUnitPrice', 'crossPrice'];
  dataSource = new MatTableDataSource<DocItem>();
  document: Document;
  @ViewChild(MatSort) sort: MatSort;
  net: number;
  cross: number;
  taxesEntries: TaxEntry[];


  constructor(private router: Router, private paymentService: PaymentService) { }

  ngOnInit() {
    this.paymentService.currentDocument.subscribe(_doc => {
      if (_doc) {
        this.document = _doc;
        this.dataSource.data = _doc.items.sort((a, b) => (a.index < b.index ? -1 : 1));
        this.dataSource.sort = this.sort;
        this.net = _doc.netTotal;
        this.cross = _doc.crossTotal;
        this.taxesEntries = _doc.taxes;
      } else {
        this.router.navigate(['/pos']);
      }
    });
  }
}
