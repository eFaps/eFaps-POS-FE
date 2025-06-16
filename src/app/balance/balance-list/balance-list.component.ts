import { DatePipe } from "@angular/common";
import { Component, OnDestroy, OnInit, ViewChild, inject } from "@angular/core";
import { MatIconButton } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatIcon } from "@angular/material/icon";
import { MatSort, MatSortHeader } from "@angular/material/sort";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from "@angular/material/table";
import { Balance, BalanceService } from "@efaps/pos-library";
import { Subscription } from "rxjs";
import { BalanceSummaryDialogComponent } from "../balance-summary-dialog/balance-summary-dialog.component";

@Component({
  selector: "app-balance-list",
  templateUrl: "./balance-list.component.html",
  styleUrls: ["./balance-list.component.scss"],
  imports: [
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatSortHeader,
    MatCellDef,
    MatCell,
    MatIconButton,
    MatIcon,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    DatePipe,
  ],
})
export class BalanceListComponent implements OnInit, OnDestroy {
  private balanceService = inject(BalanceService);
  private dialog = inject(MatDialog);

  displayedColumns = ["number", "user", "startAt", "endAt", "status", "cmd"];
  dataSource = new MatTableDataSource<Balance>();
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  private subscribtions$ = new Subscription();

  ngOnInit() {
    this.subscribtions$.add(
      this.balanceService.getBalances().subscribe({
        next: (balances) => {
          this.dataSource.data = balances;
          this.dataSource.sort = this.sort;
        },
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscribtions$.unsubscribe();
  }

  show(balance: Balance) {
    this.dialog.open(BalanceSummaryDialogComponent, {
      data: {
        balance: balance,
      },
      maxHeight: "95vh",
    });
  }
}
