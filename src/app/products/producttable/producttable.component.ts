import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { LocalStorage } from "@efaps/ngx-store";
import { Product, ProductService } from "@efaps/pos-library";

import { ProductComponent } from "../../shared/product/product.component";

@Component({
  selector: "app-producttable",
  templateUrl: "./producttable.component.html",
  styleUrls: ["./producttable.component.scss"],
})
export class ProducttableComponent implements OnInit, OnDestroy {
  displayedColumns = ["sku", "description", "cmd"];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @LocalStorage() virtKeyboard = false;
  filterForm: FormGroup;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
    });
    this.filterForm = this.fb.group({
      filter: [""],
    });
    this.filterForm
      .get("filter")
      .valueChanges.subscribe((value) => this.applyFilter(value));
  }

  ngOnDestroy() {
    // event empty method is needed to allow ngx-store handle class destruction
  }

  applyFilter(_filterValue: string) {
    _filterValue = _filterValue.trim();
    _filterValue = _filterValue.toLowerCase();
    this.dataSource.filter = _filterValue;
  }

  show(_product: Product) {
    const dialogRef = this.dialog.open(ProductComponent, {
      data: _product,
    });
  }
}
