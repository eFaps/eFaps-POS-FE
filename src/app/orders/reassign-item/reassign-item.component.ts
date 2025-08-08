import { Component, Input, OnInit, output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
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
} from "@angular/material/table";
import { DocItem, Order, PosLibraryModule } from "@efaps/pos-library";

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
    MatButtonModule,
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
  readonly moveItem = output<DocItem>();

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
