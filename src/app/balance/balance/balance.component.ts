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
      .subscribe(_balance =>  {
        this.currentBalance = _balance;
        if (_balance && !_balance.oid) {
          this.init();
        }
      });
  }

  init() {
    this.balanceService.init();
  }

  close() {
    this.balanceService.close(this.currentBalance);
  }
}
