import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import {
  PageRequest,
  Stocktaking,
  StocktakingEntry,
  StocktakingService,
} from "@efaps/pos-library";
import { merge, tap } from "rxjs";

@Component({
  selector: "app-stocktaking-entry-table",
  templateUrl: "./stocktaking-entry-table.component.html",
  styleUrls: ["./stocktaking-entry-table.component.scss"],
})
export class StocktakingEntryTableComponent {
  stocktaking: Stocktaking;
  displayedColumns = ["quantity", "uom", "sku", "description"];
  dataSource = new MatTableDataSource<StocktakingEntry>();
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  _paginator!: MatPaginator;

  constructor(
    router: Router,
    private changeDetectorRefs: ChangeDetectorRef,
    private stocktakingService: StocktakingService
  ) {
    this.stocktaking = <Stocktaking>(
      router.getCurrentNavigation()!!.extras.state
    );
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
      pageRequest.sort = [this.sort.active + "," + this.sort.direction];
    }
    this.stocktakingService
      .getEntries(this.stocktaking.id, pageRequest)
      .subscribe({
        next: (page) => {
          this.dataSource.data = [];
          //this.dataSource.paginator = null;
          this.dataSource.sort = null;
          this.dataSource.data = page.content;
          this._paginator.length = page.totalElements;
          this.changeDetectorRefs.detectChanges();
        },
      });
  }
}
