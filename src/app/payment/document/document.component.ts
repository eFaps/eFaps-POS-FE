import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Router } from '@angular/router';

import { PaymentService } from '../../services/index';
import { Document, DocItem } from '../../model/index';

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

  constructor(private router: Router, private paymentService: PaymentService) { }

  ngOnInit() {
    this.paymentService.currentDocument.subscribe(_doc => {
      if (_doc) {
        this.document = _doc;
        this.dataSource.data = _doc.items.sort((a, b) => (a < b ? -1 : 1));
        this.dataSource.sort = this.sort;
      } else {
        this.router.navigate(['/pos']);
      }
    });
  }

}
