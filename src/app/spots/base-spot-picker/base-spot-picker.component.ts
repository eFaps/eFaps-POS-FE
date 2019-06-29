import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { Spot, DocStatus } from '../../model';
import { DocumentService, PosService, SpotService } from '../../services';
import { SpotDialogComponent } from '../spot-dialog/spot-dialog.component';
import { AbstractSpotPicker } from '../abstract-spot-picker';

@Component({
  selector: 'app-base-spot-picker',
  templateUrl: './base-spot-picker.component.html',
  styleUrls: ['./base-spot-picker.component.scss']
})
export class BaseSpotPickerComponent extends AbstractSpotPicker implements OnInit {
  spots: Spot[] = [];

  constructor(router: Router,
    posService: PosService,
    documentService: DocumentService,
    private spotService: SpotService,
    private dialog: MatDialog) {
    super(router, posService, documentService);
  }

  ngOnInit() {
    this.spotService.getSpots().subscribe(_spots => {
      this.spots = _spots;
    });
  }

  showSwapModal() {
    const dialogRef = this.dialog.open(SpotDialogComponent, {});
    dialogRef.afterClosed().subscribe(_result => {
      if (_result) {
        this.ngOnInit();
      }
    });
  }
}
