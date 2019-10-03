import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Balance, BalanceService } from '@efaps/pos-library';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-balance-list',
  templateUrl: './balance-list.component.html',
  styleUrls: ['./balance-list.component.scss']
})
export class BalanceListComponent implements OnInit, OnDestroy {
  displayedColumns = ['number', 'user', 'startAt', 'endAt', 'status'];
  dataSource = new MatTableDataSource<Balance>();
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  private subscribtions$ = new Subscription();

  constructor(private balanceService: BalanceService) { }

  ngOnInit() {
    this.subscribtions$.add(this.balanceService.getBalances().subscribe({
      next: (balances) => {
        this.dataSource.data = balances;
        this.dataSource.sort = this.sort;
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscribtions$.unsubscribe();
  }
}
