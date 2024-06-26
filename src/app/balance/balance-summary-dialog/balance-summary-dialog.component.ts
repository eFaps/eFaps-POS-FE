import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BalanceService, BalanceSummary } from "@efaps/pos-library";

@Component({
  selector: "app-balance-summary-dialog",
  templateUrl: "./balance-summary-dialog.component.html",
  styleUrls: ["./balance-summary-dialog.component.scss"],
})
export class BalanceSummaryDialogComponent implements OnInit {
  summary: BalanceSummary | undefined;

  constructor(
    private balanceService: BalanceService,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) {}

  ngOnInit() {
    this.balanceService.getSummary(this.data.balance).subscribe({
      next: (summary) => (this.summary = summary),
    });
  }
}
