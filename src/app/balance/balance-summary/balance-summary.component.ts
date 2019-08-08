import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';

import { Balance, BalanceSummary } from '../../model';
import { BalanceService, PrintService, WorkspaceService } from '../../services';
import { PrintDialogComponent } from '../../shared/print-dialog/print-dialog.component';

@Component({
  selector: 'app-balance-summary',
  templateUrl: './balance-summary.component.html',
  styleUrls: ['./balance-summary.component.scss']
})
export class BalanceSummaryComponent implements OnInit {
  _balance: Balance;
  subscription$ = new Subscription()
  summary: BalanceSummary;
  printer: boolean;
  private workspaceOid: string;

  constructor(private balanceService: BalanceService,
    private workspaceService: WorkspaceService,
    private printService: PrintService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.subscription$.add(this.workspaceService.currentWorkspace.subscribe({
      next: workspace => {
        if (workspace) {
          this.printer = workspace.printCmds.some(x => x.target === 'BALANCE');
          this.workspaceOid = workspace.oid;
        } else {
          this.printer = false;
        }
      }
    }))
  }

  @Input()
  set balance(balance: Balance) {
    this._balance = balance;
    if (balance) {
      this.subscription$.add(this.balanceService.getSummary(balance).subscribe({
        next: summary => this.summary = summary
      }));
    }
  }

  print() {
    this.dialog.open(PrintDialogComponent, {
      data: this.printService.printBalance(this.workspaceOid, this._balance.id)
    });
  }

  hasBalance(): boolean {
    return this._balance != null;
  }
}
