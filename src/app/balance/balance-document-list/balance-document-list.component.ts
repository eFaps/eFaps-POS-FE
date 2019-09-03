import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';

import { DocStatus, PayableHead } from '../../model';
import { DocumentDialogComponent } from '../document-dialog/document-dialog.component';

@Component({
  selector: 'app-balance-document-list',
  templateUrl: './balance-document-list.component.html',
  styleUrls: ['./balance-document-list.component.scss']
})
export class BalanceDocumentListComponent {
  DocStatus = DocStatus;
  displayedColumns = ['type', 'number', 'date', 'total', 'status', 'order', 'cmd'];
  dataSource = new MatTableDataSource<PayableHead>();
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog) { }

  @Input()
  set payables(payables: PayableHead[]) {
    this.dataSource.data = payables;
    this.dataSource.sort = this.sort;
  }

  show(_payable: PayableHead) {
    this.dialog.open(DocumentDialogComponent, {
      data: _payable,
      maxHeight: '95vh'
    });
  }
}
