import { Component, inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Stocktaking, StocktakingService } from "@efaps/pos-library";

@Component({
  selector: "app-close-stocktaking-dialog",
  templateUrl: "./close-stocktaking-dialog.component.html",
  styleUrls: ["./close-stocktaking-dialog.component.scss"],
  standalone: false,
})
export class CloseStocktakingDialogComponent {
  private dialogRef = inject<MatDialogRef<CloseStocktakingDialogComponent>>(MatDialogRef);
  private stocktakingService = inject(StocktakingService);

  closing = false;
  stocktaking: Stocktaking;
  constructor() {
    const data = inject(MAT_DIALOG_DATA);

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
