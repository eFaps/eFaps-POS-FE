import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { DocItem, Order } from "@efaps/pos-library";

@Component({
  selector: "app-reassign-item",
  templateUrl: "./reassign-item.component.html",
  styleUrls: ["./reassign-item.component.scss"],
})
export class ReassignItemComponent implements OnInit {
  private _position: "LEFT" | "RIGHT" = "LEFT";
  private _order!: Order;

  dataSource = new MatTableDataSource<DocItem>();
  displayedColumns: string[] = [];
  @Output() moveItem: EventEmitter<DocItem> = new EventEmitter<DocItem>();

  constructor() {}

  ngOnInit() {}

  @Input()
  set position(pos: "LEFT" | "RIGHT") {
    this._position = pos;
    const columns = [
      "index",
      "quantity",
      "productDesc",
      "crossUnitPrice",
      "crossPrice",
    ];
    if (pos === "LEFT") {
      columns.push("cmdLeft");
    } else {
      columns.unshift("cmdRight");
    }
    this.displayedColumns = columns;
  }

  @Input()
  set order(order: Order) {
    this._order = order;
    this.dataSource.data = [];
    if (order) {
      this.dataSource.data = order.items.sort((a, b) =>
        a.index < b.index ? -1 : 1,
      );
    }
  }

  get order(): Order {
    return this._order;
  }

  move(item: DocItem) {
    this.moveItem.emit(item);
  }
}
