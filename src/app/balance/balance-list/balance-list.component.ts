import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Balance, BalanceService } from "@efaps/pos-library";
import { Subscription } from "rxjs";
import { BalanceSummaryDialogComponent } from "../balance-summary-dialog/balance-summary-dialog.component";

@Component({
  selector: "app-balance-list",
  templateUrl: "./balance-list.component.html",
  styleUrls: ["./balance-list.component.scss"]
})
export class BalanceListComponent implements OnInit, OnDestroy {
  displayedColumns = ["number", "user", "startAt", "endAt", "status", "cmd"];
  dataSource = new MatTableDataSource<Balance>();
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  private subscribtions$ = new Subscription();

  constructor(
    private balanceService: BalanceService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.subscribtions$.add(
      this.balanceService.getBalances().subscribe({
        next: balances => {
          this.dataSource.data = balances;
          this.dataSource.sort = this.sort;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscribtions$.unsubscribe();
  }

  show(balance: Balance) {
    console.log(balance);
    this.dialog.open(BalanceSummaryDialogComponent, {
      data: {
        balance: balance
      },
      maxHeight: "95vh"
    });
  }
}
