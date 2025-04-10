import { Component, OnInit, inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BalanceService, BalanceSummary } from "@efaps/pos-library";

@Component({
  selector: "app-balance-summary-dialog",
  templateUrl: "./balance-summary-dialog.component.html",
  styleUrls: ["./balance-summary-dialog.component.scss"],
  standalone: false,
})
export class BalanceSummaryDialogComponent implements OnInit {
  private balanceService = inject(BalanceService);
  private data = inject(MAT_DIALOG_DATA);

  summary: BalanceSummary | undefined;

  ngOnInit() {
    this.balanceService.getSummary(this.data.balance).subscribe({
      next: (summary) => (this.summary = summary),
    });
  }
}
