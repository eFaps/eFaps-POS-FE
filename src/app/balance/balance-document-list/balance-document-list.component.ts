import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';

import { Balance, DocStatus, Payable } from '../../model';
import { BalanceService, DocumentService } from '../../services';
import { DocumentDialogComponent } from '../document-dialog/document-dialog.component';

@Component({
  selector: 'app-balance-document-list',
  templateUrl: './balance-document-list.component.html',
  styleUrls: ['./balance-document-list.component.scss']
})
export class BalanceDocumentListComponent implements OnInit, OnDestroy {
  DocStatus = DocStatus;
  displayedColumns = ['type', 'number', 'date', 'total', 'status', 'cmd'];
  dataSource = new MatTableDataSource<Payable>();
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  currentBalance: Balance;
  private subscription$ = new Subscription();

  constructor(private balanceService: BalanceService,
    private documentService: DocumentService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.subscription$.add(this.balanceService.currentBalance
      .subscribe(_balance => {
        this.currentBalance = _balance;
        if (_balance) {
          this.documentService.getDocuments4Balance(_balance).subscribe(_payables => {
            this.dataSource.data = _payables;
            this.dataSource.sort = this.sort;
          });
        } else {
          this.dataSource.data = [];
          this.dataSource.sort = this.sort;
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  show(_payable: Payable) {
    this.dialog.open(DocumentDialogComponent, {
      data: _payable,
    });
  }
}
