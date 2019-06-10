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
  @Input() document: Document;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private router: Router) { }

  ngOnInit() {
    if (this.document) {
      this.dataSource.data = this.document.items.sort((a, b) => (a.index < b.index ? -1 : 1));
      this.dataSource.sort = this.sort;
    } else {
      this.router.navigate(['/pos']);
    }
  }
}
