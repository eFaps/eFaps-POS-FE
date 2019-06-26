import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Router } from '@angular/router';

import { Document, DocItem } from '../../model/index';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {
  displayedColumns = ['index', 'quantity', 'productDesc', 'crossUnitPrice', 'crossPrice'];
  dataSource = new MatTableDataSource<DocItem>();
  _document: Document;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private router: Router) { }

  ngOnInit() {
    if (!this._document) {
      this.router.navigate(['/pos']);
    }
  }

  @Input()
  set document(document: Document) {
    this._document = document;
    this.dataSource.data = this._document.items.sort((a, b) => (a.index < b.index ? -1 : 1));
    this.dataSource.sort = this.sort;
  }

  get document() {
    return this._document;
  }
}
