import { CdkScrollable } from "@angular/cdk/scrolling";
import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { MatFabButton } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";
import { Spot, SpotConfig, SpotService } from "@efaps/pos-library";
import { TranslatePipe } from "@ngx-translate/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-spot-dialog",
  templateUrl: "./spot-dialog.component.html",
  styleUrls: ["./spot-dialog.component.scss"],
  imports: [
    MatDialogTitle,
    CdkScrollable,
    MatDialogContent,
    MatFabButton,
    TranslatePipe,
  ],
})
export class SpotDialogComponent implements OnInit, OnDestroy {
  private dialogRef = inject<MatDialogRef<SpotDialogComponent>>(MatDialogRef);
  private spotService = inject(SpotService);
  data = inject(MAT_DIALOG_DATA);

  spots: Spot[] = [];
  select = true;
  origin!: Spot;
  private subscription$ = new Subscription();

  ngOnInit() {
    if (this.data === SpotConfig.EXTENDED) {
      this.spotService.getLayout().subscribe({
        next: (layout) =>
          layout.floors.forEach((floor) => {
            this.spots = this.spots.concat(floor.spots);
          }),
      });
    } else {
      this.spotService.getSpots().subscribe((_spots) => {
        this.spots = _spots;
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  selectSpot(_spot: Spot) {
    if (this.select) {
      this.select = false;
      this.origin = _spot;
    } else {
      this.spotService.swap(this.origin, _spot).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }
}
