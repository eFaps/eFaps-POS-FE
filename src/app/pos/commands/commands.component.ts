import { NgClass } from "@angular/common";
import { Component, ElementRef, OnInit, inject } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import {
  AuthService,
  InventoryService,
  Item,
  Order,
  PaymentService,
  Permission,
  PosService,
  ProductService,
  WorkspaceService,
} from "@efaps/pos-library";
import { TranslateDirective, TranslatePipe } from "@ngx-translate/core";

import { OrderDialogComponent } from "../order-dialog/order-dialog.component";

@Component({
  selector: "app-commands",
  templateUrl: "./commands.component.html",
  styleUrls: ["./commands.component.scss"],
  imports: [NgClass, MatButton, TranslateDirective, TranslatePipe],
})
export class CommandsComponent implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);
  private posService = inject(PosService);
  private paymentService = inject(PaymentService);
  private workspaceService = inject(WorkspaceService);
  private inventoryService = inject(InventoryService);
  private productService = inject(ProductService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);
  private el = inject(ElementRef);

  currentOrder: Order | undefined;
  sticky = false;
  disabled = true;
  showInventory: boolean = false;

  ngOnInit() {
    this.showInventory = this.workspaceService.showInventory();
    this.posService.currentOrder.subscribe(
      (_order) => (this.currentOrder = _order),
    );
    this.posService.currentTicket.subscribe(
      (ticket) =>
        (this.disabled = !(ticket.length > 0 && this.validateTicket(ticket))),
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
    if (this.currentOrder) {
      this.posService.updateOrder(this.currentOrder).subscribe((_order) => {
        this.onUpdate(_order);
      });
    }
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
      } else if (this.workspaceService.showSpots()) {
        this.router.navigate(["/spots"]);
      }
    });
  }

  evalSticky() {
    this.sticky =
      this.el.nativeElement.offsetTop - window.innerHeight + 100 > 0;
  }

  validateTicket(items: Item[]): boolean {
    if (
      !this.showInventory ||
      this.authService.hasPermission(Permission.ADMIN)
    ) {
      return true;
    }
    this.inventoryService
      .validateStock({
        warehouseOid: this.workspaceService.getWarehouseOid(),
        entries: items.map((item) => {
          return { productOid: item.product.oid, quantity: item.quantity };
        }),
      })
      .subscribe({
        next: (result) => {
          if (result.stock == true) {
            this.disabled = false;
          } else {
            let msg = "No hay Stock:";
            result.entries.forEach((entry) => {
              this.productService.getProduct(entry.productOid).subscribe({
                next: (product) => {
                  msg =
                    msg +
                    " " +
                    product.description +
                    " (" +
                    entry.quantity +
                    ")";
                  this.snackBar.open(msg, "", {
                    duration: 1500,
                    horizontalPosition: "center",
                    verticalPosition: "top",
                  });
                },
              });
            });
          }
        },
      });
    return false;
  }
}
