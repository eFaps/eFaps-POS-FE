import { Component, Input, ViewChild, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSort, MatSortHeader } from "@angular/material/sort";
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
import { DocStatus, PayableHead, PosLibraryModule } from "@efaps/pos-library";

import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { TranslatePipe } from "@ngx-translate/core";
import { DocumentDialogComponent } from "../document-dialog/document-dialog.component";

@Component({
  selector: "app-balance-document-list",
  templateUrl: "./balance-document-list.component.html",
  styleUrls: ["./balance-document-list.component.scss"],
  imports: [
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatSortHeader,
    MatCellDef,
    MatCell,
    MatIconButton,
    MatIcon,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    PosLibraryModule,
    TranslatePipe,
  ],
})
export class BalanceDocumentListComponent {
  private dialog = inject(MatDialog);

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
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

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
