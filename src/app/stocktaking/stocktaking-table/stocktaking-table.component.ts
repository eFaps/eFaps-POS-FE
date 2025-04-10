import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import {
  Stocktaking,
  StocktakingService,
  User,
  Warehouse,
} from "@efaps/pos-library";
import { CloseStocktakingDialogComponent } from "../close-stocktaking-dialog/close-stocktaking-dialog.component";
import { CreateStocktakingDialogComponent } from "../create-stocktaking-dialog/create-stocktaking-dialog.component";

@Component({
  selector: "app-stocktaking-table",
  templateUrl: "./stocktaking-table.component.html",
  styleUrls: ["./stocktaking-table.component.scss"],
  standalone: false,
})
export class StocktakingTableComponent implements OnInit {
  displayedColumns = [
    "number",
    "warehouse",
    "user",
    "startAt",
    "endAt",
    "status",
    "cmd",
  ];
  dataSource = new MatTableDataSource<Stocktaking>();
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  warehouses: Warehouse[] = [];
  users: User[] = [];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    private stocktakingService: StocktakingService,
  ) {}

  ngOnInit(): void {
    this.stocktakingService.getStocktakings(true).subscribe((data) => {
      this.dataSource.data = data.content;
      this.dataSource.sort = this.sort;
    });
  }

  count() {
    this.router.navigate(["stocktaking", "init"]);
  }

  createStocktaking() {
    const dialogRef = this.dialog.open(CreateStocktakingDialogComponent, {
      width: "450px",
    });
    dialogRef.afterClosed().subscribe((_result) => {
      if (_result) {
        this.dataSource = new MatTableDataSource<Stocktaking>();
        this.ngOnInit();
        this.changeDetectorRefs.detectChanges();
      }
    });
  }

  evalWarehouse(stocktaking: Stocktaking): string | undefined {
    return this.warehouses.find((warehous) => {
      warehous.oid == stocktaking.warehouseOid;
    })?.name;
  }

  show(stocktaking: Stocktaking) {
    this.router.navigate(["stocktaking", "entries"], {
      state: stocktaking,
    });
  }

  close(stocktaking: Stocktaking) {
    const dialogRef = this.dialog.open(CloseStocktakingDialogComponent, {
      width: "400px",
      disableClose: true,
      data: { stocktaking: stocktaking },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.ngOnInit();
    });
  }
}
