import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Balance } from '../../model';
import { BalanceService } from '../../services';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {
  currentBalance: Balance;

  constructor(private balanceService: BalanceService, private dialog: MatDialog,
    private translateService: TranslateService) { }

  ngOnInit() {
    this.balanceService.currentBalance
      .subscribe(_balance =>  {
        this.currentBalance = _balance;
      });
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
