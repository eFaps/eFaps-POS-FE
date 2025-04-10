import { Component, ElementRef, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
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

import { MatSnackBar } from "@angular/material/snack-bar";
import { OrderDialogComponent } from "../order-dialog/order-dialog.component";

@Component({
  selector: "app-commands",
  templateUrl: "./commands.component.html",
  styleUrls: ["./commands.component.scss"],
  standalone: false,
})
export class CommandsComponent implements OnInit {
  currentOrder: Order | undefined;
  sticky = false;
  disabled = true;
  showInventory: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private posService: PosService,
    private paymentService: PaymentService,
    private workspaceService: WorkspaceService,
    private inventoryService: InventoryService,
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private el: ElementRef,
  ) {}

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
