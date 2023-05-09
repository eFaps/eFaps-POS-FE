import { OnInit, Directive } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import {
  DocStatus,
  DocumentService,
  PosService,
  Spot,
  SpotConfig,
} from "@efaps/pos-library";

import { SelectOrderDialogComponent } from "./select-order-dialog/select-order-dialog.component";
import { SpotDialogComponent } from "./spot-dialog/spot-dialog.component";

@Directive()
export abstract class AbstractSpotPicker implements OnInit {
  constructor(
    protected router: Router,
    protected posService: PosService,
    protected documentService: DocumentService,
    protected dialog: MatDialog
  ) {}

  selectSpot(spot: Spot) {
    if (spot.orders && spot.orders.length > 0) {
      if (spot.orders.length > 1) {
        const dialogRef = this.dialog.open(SelectOrderDialogComponent, {
          data: spot.orders,
        });
        dialogRef.afterClosed().subscribe({
          next: (order) => {
            if (order) {
              this.posService.setOrder(order);
              this.router.navigate(["/pos"]);
            }
          },
        });
      } else {
        this.posService.setOrder(spot.orders[0]);
        this.router.navigate(["/pos"]);
      }
    } else {
      const order = {
        id: null,
        oid: null,
        number: null,
        currency: this.posService.currency,
        exchangeRate: this.posService.exchangeRate,
        items: [],
        status: DocStatus.OPEN,
        netTotal: 0,
        crossTotal: 0,
        payableAmount: 0,
        taxes: [],
        spot: spot,
        discount: null,
      };
      this.documentService.createOrder(order).subscribe((_order) => {
        this.posService.setOrder(_order);
        this.router.navigate(["/pos"]);
      });
    }
  }

  showSwapModal() {
    const dialogRef = this.dialog.open(SpotDialogComponent, {
      data: this.getSpotConfig(),
    });
    dialogRef.afterClosed().subscribe((_result) => {
      if (_result) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit(): void {}

  abstract getSpotConfig(): SpotConfig;
}
