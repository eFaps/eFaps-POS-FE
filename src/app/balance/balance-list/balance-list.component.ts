import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { BalanceService } from '../../services';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Balance } from '../../model';

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
