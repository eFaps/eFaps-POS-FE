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

  selectSpot(spot: Spot) {
    if (spot.orders && spot.orders.length > 0) {
      this.posService.setOrder(spot.orders[0]);
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
        spot: spot,
        discount: null,
        payableOid: null
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
