import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Spot, SpotConfig, SpotService } from "@efaps/pos-library";
import { Subscription } from "rxjs";

@Component({
    selector: "app-spot-dialog",
    templateUrl: "./spot-dialog.component.html",
    styleUrls: ["./spot-dialog.component.scss"],
    standalone: false
})
export class SpotDialogComponent implements OnInit, OnDestroy {
  spots: Spot[] = [];
  select = true;
  origin!: Spot;
  private subscription$ = new Subscription();

  constructor(
    private dialogRef: MatDialogRef<SpotDialogComponent>,
    private spotService: SpotService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

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
