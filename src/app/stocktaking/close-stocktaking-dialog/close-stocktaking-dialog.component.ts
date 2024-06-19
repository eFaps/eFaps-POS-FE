import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Stocktaking, StocktakingService } from "@efaps/pos-library";

@Component({
  selector: "app-close-stocktaking-dialog",
  templateUrl: "./close-stocktaking-dialog.component.html",
  styleUrls: ["./close-stocktaking-dialog.component.scss"],
})
export class CloseStocktakingDialogComponent {
  closing = false;
  stocktaking: Stocktaking;
  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialogRef: MatDialogRef<CloseStocktakingDialogComponent>,
    private stocktakingService: StocktakingService,
  ) {
    this.stocktaking = data.stocktaking;
  }

  close() {
    this.closing = true;
    this.stocktakingService.closeStocktaking(this.stocktaking.id).subscribe({
      next: (_) => {
        this.dialogRef.close();
      },
      error: (_) => {
        this.dialogRef.close();
      },
    });
  }
}
