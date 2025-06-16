import { Component, OnDestroy, OnInit, ViewChild, inject } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from "@angular/material/dialog";
import {
  CalculatorService,
  DocItem,
  Document,
  DocumentService,
  Order,
} from "@efaps/pos-library";
import { Observable, Subscription, zip } from "rxjs";

import { CdkScrollable } from "@angular/cdk/scrolling";
import { MatButton, MatFabButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { ReassignItemComponent } from "../reassign-item/reassign-item.component";

@Component({
  selector: "app-reassign-dialog",
  templateUrl: "./reassign-dialog.component.html",
  styleUrls: ["./reassign-dialog.component.scss"],
  imports: [
    CdkScrollable,
    MatDialogContent,
    MatFabButton,
    ReassignItemComponent,
    MatDialogActions,
    MatButton,
    MatIcon,
  ],
})
export class ReassignDialogComponent implements OnInit, OnDestroy {
  private documentService = inject(DocumentService);
  private calculatorService = inject(CalculatorService);
  private dialogRef =
    inject<MatDialogRef<ReassignDialogComponent>>(MatDialogRef);
  private data = inject(MAT_DIALOG_DATA);

  orders: Order[] = [];
  orderLeft!: Order;
  orderRight!: Order;

  @ViewChild("left")
  private left!: ReassignItemComponent;
  @ViewChild("right")
  private right!: ReassignItemComponent;

  private subscription = new Subscription();

  ngOnInit() {
    this.subscription.add(
      this.documentService.getOpenOrders().subscribe({
        next: (orders) => {
          if (orders) {
            this.orders = orders
              .filter((item) => {
                return item.spot && item.spot.id == this.data.spot.id;
              })
              .sort((o1: Order, o2: Order) => {
                if (o1.number! < o2.number!) {
                  return -1;
                }
                if (o1.number! > o2.number!) {
                  return 1;
                }
                return 0;
              });
            this.orderLeft = this.orders[0];
            this.orderRight = this.orders[1];
          }
        },
      }),
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
      (it) => it.product.oid === item.product.oid,
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
          currency: item.currency,
          exchangeRate: item.exchangeRate,
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
    const orderObs: Observable<Document>[] = [];
    this.orders.forEach((order) => {
      orderObs.push(this.calculatorService.calculateDoc(order));
    });

    zip(orderObs).subscribe({
      next: (calculatedDocs) => {
        const orderObs2: Observable<Document>[] = [];
        calculatedDocs.forEach((order) => {
          orderObs2.push(this.documentService.updateOrder(order));
        });
        zip(orderObs2).subscribe((_) => {
          this.dialogRef.close();
        });
      },
    });
  }
}
