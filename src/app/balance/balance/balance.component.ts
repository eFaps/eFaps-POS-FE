import { Component, OnInit } from '@angular/core';

import { Balance } from '../../model';
import { BalanceService } from '../../services';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {
  currentBalance: Balance;

  constructor(private balanceService: BalanceService) { }

  ngOnInit() {
    this.balanceService.getCurrent(false)
      .subscribe(_balance => this.currentBalance = _balance,
          error => if (error.status !== 404) {
            console.log(error);
          });
  }

  init() {
    this.balanceService.getCurrent(true)
      .subscribe(_balance => this.currentBalance = _balance);
  }
}
