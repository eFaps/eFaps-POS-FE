import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from "@angular/material/table";
import { DocItem, Order, PosLibraryModule } from "@efaps/pos-library";
import { MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";

@Component({
    selector: "app-reassign-item",
    templateUrl: "./reassign-item.component.html",
    styleUrls: ["./reassign-item.component.scss"],
    imports: [
        MatTable,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        MatCellDef,
        MatCell,
        MatButton,
        MatIcon,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        PosLibraryModule,
    ],
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
