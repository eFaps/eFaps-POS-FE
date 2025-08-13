import { CdkScrollable } from "@angular/cdk/scrolling";
import { Component, OnInit, inject, viewChild } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from "@angular/material/table";
import {
  CalculatorService,
  DocItem,
  DocStatus,
  DocumentService,
  Order,
} from "@efaps/pos-library";
import { merge } from "rxjs";

@Component({
  selector: "app-split-order-dialog",
  templateUrl: "./split-order-dialog.component.html",
  styleUrls: ["./split-order-dialog.component.scss"],
  imports: [
    CdkScrollable,
    MatDialogContent,
    MatTableModule,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatButtonModule,
    MatIconModule,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    MatDialogActions,
    MatDividerModule,
  ],
})
export class SplitOrderDialogComponent implements OnInit {
  private dialogRef =
    inject<MatDialogRef<SplitOrderDialogComponent>>(MatDialogRef);
  private documentService = inject(DocumentService);
  private calculatorService = inject(CalculatorService);

  originTable = viewChild<MatTable<DocItem>>("originTable");
  targetTable = viewChild<MatTable<DocItem>>("targetTable");

  originDataSource = new MatTableDataSource<DocItem>();
  targetDataSource = new MatTableDataSource<DocItem>();
  originColumns = [
    "index",
    "quantity",
    "productDesc",
    "crossUnitPrice",
    "crossPrice",
    "cmd",
  ];
  targetColumns = [
    "cmd",
    "index",
    "quantity",
    "productDesc",
    "crossUnitPrice",
    "crossPrice",
  ];
  originOrder: Order = inject(MAT_DIALOG_DATA);
  targetOrder!: Order;

  ngOnInit() {
    this.originDataSource.data = this.originOrder.items.sort(
      (a: DocItem, b: DocItem) => (a.index < b.index ? -1 : 1),
    );
    this.targetOrder = {
      type: "ORDER",
      id: null,
      oid: null,
      number: null,
      currency: this.originOrder.currency,
      exchangeRate: this.originOrder.exchangeRate,
      items: [],
      status: DocStatus.OPEN,
      netTotal: 0,
      crossTotal: 0,
      payableAmount: 0,
      taxes: [],
      discount: null,
    };
  }

  moveToTarget(_item: DocItem) {
    const origin = [...this.originDataSource.data];
    const target = [...this.targetDataSource.data];
    this.move(_item, origin, target);
    this.originOrder.items = origin;
    this.targetOrder.items = target;
    this.update();
  }

  moveToOrigin(_item: DocItem) {
    const origin = [...this.originDataSource.data];
    const target = [...this.targetDataSource.data];
    this.move(_item, target, origin);
    this.originOrder.items = origin;
    this.targetOrder.items = target;
    this.update();
  }

  move(item2move: DocItem, origin: DocItem[], target: DocItem[]) {
    const targetItem = target.find(
      (item) => item.product.oid == item2move.product.oid,
    );
    if (targetItem) {
      targetItem.quantity = targetItem.quantity + 1;
      if (item2move.quantity === 1) {
        const index: number = origin.indexOf(item2move);
        if (index !== -1) {
          origin.splice(index, 1);
        }
      } else {
        item2move.quantity = item2move.quantity - 1;
      }
    } else {
      if (item2move.quantity === 1) {
        const index: number = origin.indexOf(item2move);
        if (index !== -1) {
          origin.splice(index, 1);
          target.push(item2move);
        }
      } else {
        item2move.quantity = item2move.quantity - 1;
        target.push({
          index: item2move.index,
          product: item2move.product,
          quantity: 1,
          netPrice: item2move.netPrice,
          netUnitPrice: item2move.netUnitPrice,
          crossPrice: item2move.crossPrice,
          crossUnitPrice: item2move.crossUnitPrice,
          currency: item2move.currency,
          exchangeRate: item2move.exchangeRate,
          taxes: item2move.taxes,
        });
      }
    }
    origin.sort((a, b) => (a.index < b.index ? -1 : 1));
    target.sort((a, b) => (a.index < b.index ? -1 : 1));
    let i = 1;
    origin.forEach((item) => (item.index = i++));
    i = 1;
    target.forEach((item) => (item.index = i++));
  }

  update() {
    this.calculatorService.calculateDoc(this.originOrder).subscribe({
      next: (order) => {
        this.originOrder = order;
        this.originDataSource.data = [];
        this.originTable()?.renderRows();
        this.originDataSource.data = this.originOrder.items;
        this.originTable()?.renderRows();
      },
    });
    this.calculatorService.calculateDoc(this.targetOrder).subscribe({
      next: (order) => {
        this.targetOrder = order;
        this.targetDataSource.data = [];
        this.targetTable()?.renderRows();
        this.targetDataSource.data = this.targetOrder.items;
        this.targetTable()?.renderRows();
      },
    });
  }

  save() {
    merge(
      this.documentService.updateOrder(this.originOrder),
      this.documentService.createOrder(this.targetOrder),
    ).subscribe({
      next: () => {
        this.dialogRef.close();
      },
    });
  }

  isSaveable(): boolean {
    return (
      this.originOrder.items.length > 0 && this.targetOrder.items.length > 0
    );
  }
}
