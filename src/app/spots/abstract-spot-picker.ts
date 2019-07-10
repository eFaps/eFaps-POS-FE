import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { DocStatus, Spot, SpotConfig } from '../model';
import { DocumentService, PosService } from '../services';
import { SpotDialogComponent } from './spot-dialog/spot-dialog.component';

export abstract class AbstractSpotPicker implements OnInit {

  constructor(protected router: Router,
    protected posService: PosService,
    protected documentService: DocumentService,
    protected dialog: MatDialog
  ) {

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
        spot: _spot,
        discount: null
      };
      this.documentService.createOrder(order).subscribe(_order => {
        this.posService.setOrder(_order);
        this.router.navigate(['/pos']);
      });
    }
  }

  showSwapModal() {
    const dialogRef = this.dialog.open(SpotDialogComponent, { data: this.getSpotConfig() });
    dialogRef.afterClosed().subscribe(_result => {
      if (_result) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit(): void {
  }

  abstract getSpotConfig(): SpotConfig;
}
