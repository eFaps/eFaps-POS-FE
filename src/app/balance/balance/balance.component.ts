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
    this.balanceService.currentBalance
      .subscribe(_balance => this.currentBalance = _balance);
  }

  init() {
    this.balanceService.init();
  }
}
