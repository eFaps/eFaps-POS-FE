import { Component, Input, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { DocStatus, PayableHead } from "@efaps/pos-library";

import { DocumentDialogComponent } from "../document-dialog/document-dialog.component";

@Component({
  selector: "app-balance-document-list",
  templateUrl: "./balance-document-list.component.html",
  styleUrls: ["./balance-document-list.component.scss"],
})
export class BalanceDocumentListComponent {
  DocStatus = DocStatus;
  displayedColumns = [
    "type",
    "number",
    "date",
    "total",
    "status",
    "order",
    "cmd",
  ];
  dataSource = new MatTableDataSource<PayableHead>();
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog) {}

  @Input()
  set payables(payables: PayableHead[]) {
    this.dataSource.data = payables;
    this.dataSource.sort = this.sort;
  }

  show(_payable: PayableHead) {
    this.dialog.open(DocumentDialogComponent, {
      data: _payable,
      maxHeight: "95vh",
    });
  }
}
