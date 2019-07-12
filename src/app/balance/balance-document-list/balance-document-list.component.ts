import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';

import { DocStatus, Payable } from '../../model';
import { DocumentDialogComponent } from '../document-dialog/document-dialog.component';

@Component({
  selector: 'app-balance-document-list',
  templateUrl: './balance-document-list.component.html',
  styleUrls: ['./balance-document-list.component.scss']
})
export class BalanceDocumentListComponent {
  DocStatus = DocStatus;
  displayedColumns = ['type', 'number', 'date', 'total', 'status', 'cmd'];
  dataSource = new MatTableDataSource<Payable>();
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog) { }

  @Input()
  set payables(payables: Payable[]) {
    this.dataSource.data = payables;
    this.dataSource.sort = this.sort;
  }

  show(_payable: Payable) {
    this.dialog.open(DocumentDialogComponent, {
      data: _payable,
    });
  }
}
