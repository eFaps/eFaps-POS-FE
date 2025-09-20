import { DatePipe } from "@angular/common";
import { ChangeDetectorRef, Component, ViewChild, inject } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatIcon } from "@angular/material/icon";
import { MatPaginator } from "@angular/material/paginator";
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
import { Router } from "@angular/router";
import {
  PageRequest,
  Stocktaking,
  StocktakingEntry,
  StocktakingService,
} from "@efaps/pos-library";
import { merge, tap } from "rxjs";

import { ConfirmDialogComponent } from "src/app/shared/confirm-dialog/confirm-dialog.component";

@Component({
  selector: "app-stocktaking-entry-table",
  templateUrl: "./stocktaking-entry-table.component.html",
  styleUrls: ["./stocktaking-entry-table.component.scss"],
  imports: [
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatSortHeader,
    MatCellDef,
    MatCell,
    MatButton,
    MatIcon,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    MatPaginator,
    DatePipe,
  ],
})
export class StocktakingEntryTableComponent {
  private changeDetectorRefs = inject(ChangeDetectorRef);
  private stocktakingService = inject(StocktakingService);
  private dialog = inject(MatDialog);

  stocktaking: Stocktaking;
  displayedColumns = [
    "quantity",
    "uom",
    "sku",
    "description",
    "comment",
    "createdAt",
    "cmd",
  ];
  dataSource = new MatTableDataSource<StocktakingEntry>();
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  _paginator!: MatPaginator;

  allowDelete = false;
  constructor() {
    const router = inject(Router);

    this.stocktaking = <Stocktaking>(
      router.currentNavigation()!!.extras.state
    );
    this.allowDelete = this.stocktaking.status == "OPEN";
  }

  @ViewChild(MatPaginator, { static: false })
  set paginator(paginator: MatPaginator) {
    this._paginator = paginator;
    merge(this.sort.sortChange, this._paginator.page)
      .pipe(tap(() => this.loadEntries()))
      .subscribe();
    this.loadEntries();
  }

  loadEntries() {
    var pageRequest: PageRequest = {
      size: this._paginator.pageSize,
      page: this._paginator.pageIndex,
    };
    if (this.sort.active) {
      let sortField;
      if ("createdAt" == this.sort.active) {
        sortField = "createdDate";
      } else {
        sortField = this.sort.active;
      }
      pageRequest.sort = [sortField + "," + this.sort.direction];
    }
    this.stocktakingService
      .getEntries(this.stocktaking.id, pageRequest)
      .subscribe({
        next: (page) => {
          this.dataSource.data = [];
          this.dataSource.paginator = null;
          this.dataSource.sort = null;
          this.dataSource.data = page.content;
          this._paginator.length = page.totalElements;
          this.changeDetectorRefs.detectChanges();
        },
      });
  }

  delete(entry: StocktakingEntry) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "300px",
      data: { title: "Borrar registro" },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.stocktakingService
          .deleteEntry(this.stocktaking.id, entry.id!!)
          .subscribe({
            next: () => {
              this.loadEntries();
            },
          });
      }
    });
  }
}
