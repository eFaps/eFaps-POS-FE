import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { Spot } from '../../model';
import { SpotService } from '../../services';

@Component({
  selector: 'app-spot-dialog',
  templateUrl: './spot-dialog.component.html',
  styleUrls: ['./spot-dialog.component.scss']
})
export class SpotDialogComponent implements OnInit {
  spots: Spot[] = [];
  select = true;
  origin: Spot;
  constructor(private dialogRef: MatDialogRef<SpotDialogComponent>,
    private spotService: SpotService) { }

  ngOnInit() {
    this.spotService.getSpots().subscribe(_spots => {
      this.spots = _spots;
    });
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
