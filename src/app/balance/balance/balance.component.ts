import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import { Balance, Payable } from '../../model';
import { BalanceService, DocumentService } from '../../services';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit, OnDestroy {
  currentBalance: Balance;
  payables: Payable[] = [];
  busy: Subscription;
  subscription$ = new Subscription();

  constructor(private balanceService: BalanceService,
    private documentService: DocumentService,
    private translateService: TranslateService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.subscription$.add(this.balanceService.currentBalance
      .subscribe(balance => {
        if (this.busy) {
          this.busy.unsubscribe();
        }
        this.currentBalance = balance;
        this.payables = [];
        if (balance) {
          this.busy = this.documentService.getDocuments4Balance(balance).subscribe({
            next: payables => this.payables = this.payables.concat(payables)
          })
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
    if (this.busy) {
      this.busy.unsubscribe();
    }
  }

  init() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { title: this.translateService.instant('BALANCE.CONFIRM-OPEN') }
    });
    dialogRef.afterClosed().subscribe(_result => {
      if (_result) {
        this.balanceService.init();
      }
    });
  }

  close() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { title: this.translateService.instant('BALANCE.CONFIRM-CLOSE') }
    });
    dialogRef.afterClosed().subscribe(_result => {
      if (_result) {
        this.balanceService.close(this.currentBalance);
      }
    });
  }
}
