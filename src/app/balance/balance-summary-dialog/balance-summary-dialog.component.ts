import { Component, inject, signal } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { BalanceService, BalanceSummary } from "@efaps/pos-library";

import { BalanceSummaryComponent } from "../balance-summary/balance-summary.component";

@Component({
  selector: "app-balance-summary-dialog",
  templateUrl: "./balance-summary-dialog.component.html",
  styleUrls: ["./balance-summary-dialog.component.scss"],
  imports: [BalanceSummaryComponent, MatDialogModule],
})
export class BalanceSummaryDialogComponent {
  private balanceService = inject(BalanceService);
  private data = inject(MAT_DIALOG_DATA);

  summary = signal<BalanceSummary | undefined>(undefined);

  constructor() {
    this.balanceService.getSummary(this.data.balance).subscribe({
      next: (summary) => this.summary.set(summary),
    });
  }
}
