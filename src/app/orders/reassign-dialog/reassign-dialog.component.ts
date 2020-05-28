import { Component, Inject, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {
  DocItem,
  DocumentService,
  Order,
  PosService,
} from "@efaps/pos-library";
import { Observable, Subscription, forkJoin } from "rxjs";

import { ReassignItemComponent } from "../reassign-item/reassign-item.component";

@Component({
  selector: "app-reassign-dialog",
  templateUrl: "./reassign-dialog.component.html",
  styleUrls: ["./reassign-dialog.component.scss"],
})
export class ReassignDialogComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  orderLeft: Order;
  orderRight: Order;

  @ViewChild("left")
  private left: ReassignItemComponent;
  @ViewChild("right")
  private right: ReassignItemComponent;

  private subscription = new Subscription();

  constructor(
    private documentService: DocumentService,
    private posService: PosService,
    private dialogRef: MatDialogRef<ReassignDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.documentService.getOpenOrders().subscribe({
        next: (orders) => {
          if (orders) {
            this.orders = orders
              .filter((item) => {
                return item.spot && item.spot.id == this.data.spot.id;
              })
              .sort((o1, o2) => {
                if (o1.number < o2.number) {
                  return -1;
                }
                if (o1.number > o2.number) {
                  return 1;
                }
                return 0;
              });
            this.orderLeft = this.orders[0];
            this.orderRight = this.orders[1];
          }
        },
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectOrderLeft(order: Order) {
    this.orderLeft = order;
    if (this.orderLeft === this.orderRight) {
      if (this.orderLeft == this.orders[0]) {
        this.orderRight = this.orders[1];
      } else {
        this.orderRight = this.orders[0];
      }
    }
  }

  selectOrderRight(order: Order) {
    this.orderRight = order;
  }

  moveToRight(item: DocItem) {
    this.move(item, this.orderLeft, this.orderRight);
  }

  moveToLeft(item: DocItem) {
    this.move(item, this.orderRight, this.orderLeft);
  }

  private move(item: DocItem, origin: Order, target: Order) {
    const index: number = origin.items.indexOf(item);
    const targetIndex = target.items.findIndex(
      (it) => it.product.oid === item.product.oid
    );
    if (targetIndex !== -1) {
      target.items[targetIndex].quantity++;
      if (item.quantity === 1) {
        if (index !== -1) {
          origin.items.splice(index, 1);
        }
      } else {
        origin.items[index].quantity = item.quantity - 1;
      }
    } else {
      if (item.quantity === 1) {
        if (index !== -1) {
          origin.items.splice(index, 1);
          target.items.push(item);
        }
      } else {
        origin.items[index].quantity = item.quantity - 1;
        target.items.push({
          index: item.index,
          product: item.product,
          quantity: 1,
          netPrice: item.netPrice,
          netUnitPrice: item.netUnitPrice,
          crossPrice: item.crossPrice,
          crossUnitPrice: item.crossUnitPrice,
          taxes: item.taxes,
        });
      }
    }
    var idx = 1;
    origin.items.forEach((item) => (item.index = idx++));
    var idx = 1;
    target.items.forEach((item) => (item.index = idx++));

    // reload in child
    this.left.order = this.orderLeft;
    this.right.order = this.orderRight;
  }

  save() {
    const updates: Observable<Order>[] = [];
    this.orders.forEach((order) => {
      this.posService.setOrder(order);
      updates.push(this.posService.updateOrder(order));
    });
    this.posService.reset();
    forkJoin(...updates).subscribe({
      next: (_) => {
        this.dialogRef.close();
      },
    });
  }
}
