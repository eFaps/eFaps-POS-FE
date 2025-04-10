import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { DocItem, DocStatus, Order, PosService } from "@efaps/pos-library";

@Component({
  selector: "app-split-order-dialog",
  templateUrl: "./split-order-dialog.component.html",
  styleUrls: ["./split-order-dialog.component.scss"],
  standalone: false,
})
export class SplitOrderDialogComponent implements OnInit {
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
  originOrder: Order;
  targetOrder!: Order;
  saveable = false;

  constructor(
    private posService: PosService,
    private dialogRef: MatDialogRef<SplitOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.originOrder = data;
  }

  ngOnInit() {
    this.originDataSource.data = this.data.items.sort(
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
    const origin = this.originDataSource.data;
    const target = this.targetDataSource.data;
    this.move(_item, origin, target);
    this.originOrder.items = origin;
    this.targetOrder.items = target;
    this.update();
  }

  moveToOrigin(_item: DocItem) {
    const origin = this.originDataSource.data;
    const target = this.targetDataSource.data;
    this.move(_item, target, origin);
    this.originOrder.items = origin;
    this.targetOrder.items = target;
    this.update();
  }

  move(_item: DocItem, _origin: DocItem[], _target: DocItem[]) {
    const targetItem = _target.find((item) => item.index === _item.index);
    if (targetItem) {
      targetItem.quantity = targetItem.quantity + 1;
      if (_item.quantity === 1) {
        const index: number = _origin.indexOf(_item);
        if (index !== -1) {
          _origin.splice(index, 1);
        }
      } else {
        _item.quantity = _item.quantity - 1;
      }
    } else {
      if (_item.quantity === 1) {
        const index: number = _origin.indexOf(_item);
        if (index !== -1) {
          _origin.splice(index, 1);
          _target.push(_item);
        }
      } else {
        _item.quantity = _item.quantity - 1;
        _target.push({
          index: _item.index,
          product: _item.product,
          quantity: 1,
          netPrice: _item.netPrice,
          netUnitPrice: _item.netUnitPrice,
          crossPrice: _item.crossPrice,
          crossUnitPrice: _item.crossUnitPrice,
          currency: _item.currency,
          exchangeRate: _item.exchangeRate,
          taxes: _item.taxes,
        });
      }
    }
    _origin.sort((a, b) => (a.index < b.index ? -1 : 1));
    _target.sort((a, b) => (a.index < b.index ? -1 : 1));
  }

  update() {
    this.posService.setOrder(this.originOrder);
    this.posService.calculateOrder(this.originOrder).subscribe({
      next: (order) => {
        this.originOrder = order;
        this.originDataSource.data = this.originOrder.items;

        this.posService.setOrder(this.targetOrder);
        this.posService.calculateOrder(this.targetOrder).subscribe({
          next: (order2) => {
            this.targetOrder = order2;
            this.targetDataSource.data = this.targetOrder.items;
            this.saveable =
              this.originOrder.items.length > 0 &&
              this.targetOrder.items.length > 0;
          },
        });
      },
    });
  }

  save() {
    this.posService.setOrder(this.originOrder);
    this.posService.updateOrder(this.originOrder).subscribe(() => {
      this.posService.setOrder(this.targetOrder);
      this.posService.createOrder().subscribe(() => {
        this.posService.reset();
        this.dialogRef.close();
      });
    });
  }
}
