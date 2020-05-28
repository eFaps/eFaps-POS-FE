import { Component, ElementRef, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import {
  Order,
  PaymentService,
  PosService,
  WorkspaceService,
} from "@efaps/pos-library";

import { OrderDialogComponent } from "../order-dialog/order-dialog.component";

@Component({
  selector: "app-commands",
  templateUrl: "./commands.component.html",
  styleUrls: ["./commands.component.scss"],
})
export class CommandsComponent implements OnInit {
  currentOrder: Order;
  sticky = false;
  constructor(
    private router: Router,
    private posService: PosService,
    private paymentService: PaymentService,
    private workspaceService: WorkspaceService,
    private dialog: MatDialog,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.posService.currentOrder.subscribe(
      (_order) => (this.currentOrder = _order)
    );
  }

  hasOrder(): boolean {
    return this.currentOrder ? true : false;
  }

  createOrder() {
    this.posService.createOrder().subscribe((_order) => {
      this.onUpdate(_order);
    });
  }

  updateOrder() {
    this.posService.updateOrder(this.currentOrder).subscribe((_order) => {
      this.onUpdate(_order);
    });
  }

  onUpdate(_order: Order) {
    const order = Object.assign({ type: "ORDER", discount: null }, _order);
    const dialogRef = this.dialog.open(OrderDialogComponent, {
      width: "450px",
      disableClose: true,
      data: { order: order },
    });
    dialogRef.afterClosed().subscribe((_result) => {
      this.posService.reset();
      if (_result) {
        this.paymentService.updateDocument(_result);
        this.router.navigate(["/payment"]);
      } else {
        if (this.workspaceService.showSpots()) {
          this.router.navigate(["/spots"]);
        }
      }
    });
  }

  evalSticky() {
    this.sticky =
      this.el.nativeElement.offsetTop - window.innerHeight + 100 > 0;
  }
}
