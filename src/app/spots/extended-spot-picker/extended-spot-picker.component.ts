import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { Floor, Spot, SpotConfig, SpotsLayout } from '../../model';
import { DocumentService, PosService, SpotService, ImageService } from '../../services';
import { AbstractSpotPicker } from '../abstract-spot-picker';
import { DomSanitizer } from '@angular/platform-browser';
import { SplitDialogComponent } from '../split-dialog/split-dialog.component';

@Component({
  selector: 'app-extended-spot-picker',
  templateUrl: './extended-spot-picker.component.html',
  styleUrls: ['./extended-spot-picker.component.scss']
})
export class ExtendedSpotPickerComponent extends AbstractSpotPicker implements OnInit {
  spotsLayout: SpotsLayout;
  editMode = false;
  splitMode = false;
  sidenav = false;
  images = new Map<String, String>();
  constructor(router: Router,
    posService: PosService,
    documentService: DocumentService,
    dialog: MatDialog,
    private spotService: SpotService,
    private imageService: ImageService,
    private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar,
  ) {
    super(router, posService, documentService, dialog);
  }

  ngOnInit() {
    this.spotService.getLayout().subscribe({
      next: layout => {
        this.spotsLayout = layout;
        this.floors.forEach(floor => {
          this.imageService.getBase64Image(floor.imageOid).subscribe({
            next: data => this.images.set(floor.imageOid, data)
          });
        });
      }
    });
  }

  get floors() {
    return this.spotsLayout ? this.spotsLayout.floors : [];
  }

  image(floor: Floor) {
    if (this.images.has(floor.imageOid)) {
      return this.sanitizer.bypassSecurityTrustStyle("url('" + this.images.get(floor.imageOid) + "')");
    }
    return "url('')";
  }

  togglEditMode() {
    this.editMode = !this.editMode;
  }

  toggleSplitMode() {
    this.splitMode = !this.splitMode;
  }

  selectSpot(spot: Spot) {
    if (this.splitMode) {
      if (spot.orders && spot.orders.length > 0) {
        const dialogRef = this.dialog.open(SplitDialogComponent, { data: spot });
        dialogRef.afterClosed().subscribe({
          next: _ => { this.splitMode = false }
        });
      } else {
        this.snackBar.open('No selecionable', '', {
          duration: 3000
        });
      }
    } else if (!this.editMode) {
      super.selectSpot(spot);
    }
  }

  dragEnded(event: CdkDragEnd) {
    const spot: Spot = event.source.data;
    const position = event.source.getFreeDragPosition();
    this.spotService.setPosition(spot, position);
  }

  getSpotConfig(): SpotConfig {
    return SpotConfig.EXTENDED;
  }

  getLeft(i: number): string {
    while (i > 9) {
      i = i - 10;
    }
    return (i * 60) + "px";
  }

  getTop(i: number) {
    var mul = 0;
    while (i > 9) {
      i = i - 10;
      mul++;
    }
    return (mul * 60) + "px";
  }
}
