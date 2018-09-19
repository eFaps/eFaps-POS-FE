import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { DocStatus, Document, Spot } from '../../model/index';
import { DocumentService, PosService, SpotService, WorkspaceService } from '../../services/index';
import { SpotDialogComponent } from '../spot-dialog/spot-dialog.component';

@Component({
  selector: 'app-spot-picker',
  templateUrl: './spot-picker.component.html',
  styleUrls: ['./spot-picker.component.scss']
})
export class SpotPickerComponent implements OnInit {
  spots: Spot[] = [];

  constructor(private router: Router,
    private posService: PosService,
    private documentService: DocumentService,
    private workspaceService: WorkspaceService,
    private spotService: SpotService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.spotService.getSpots().subscribe(_spots => {
      this.spots = _spots;
    });
  }

  selectSpot(_spot: Spot) {
    if (_spot.order) {
      this.posService.setOrder(_spot.order);
      this.router.navigate(['/pos']);
    } else {
      const order = {
        id: null,
        oid: null,
        number: null,
        currency: this.posService.currency,
        items: [],
        status: DocStatus.OPEN,
        netTotal: 0,
        crossTotal: 0,
        taxes: [],
        spot: _spot
      };
      this.documentService.createOrder(order).subscribe(_order => {
        this.posService.setOrder(_order);
        this.router.navigate(['/pos']);
      });
    }
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
