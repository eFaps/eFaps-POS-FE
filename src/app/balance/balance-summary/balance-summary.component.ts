import { Component, OnInit, Input } from '@angular/core';
import { BalanceService } from '../../services';
import { Balance, BalanceSummary } from '../../model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-balance-summary',
  templateUrl: './balance-summary.component.html',
  styleUrls: ['./balance-summary.component.scss']
})
export class BalanceSummaryComponent implements OnInit {

  _balance: Balance;
  subscribtion$ = new Subscription()
  summary: BalanceSummary;

  constructor(private balanceService: BalanceService) { }

  ngOnInit() {

  }

  @Input()
  set balance(balance: Balance) {
    this._balance = balance;
    if (balance) {
      this.subscribtion$.add(this.balanceService.getSummary(balance).subscribe({
        next: summary => this.summary = summary
      }));
    }
  }
}
