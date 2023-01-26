import { Component, OnDestroy, OnInit, ViewChild, Input } from "@angular/core";
import {
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import {
  AuthService,
  InventoryService,
  PosService,
  Product,
  ProductService,
  Roles,
  WorkspaceService,
} from "@efaps/pos-library";
import { Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";

import { ProductComponent } from "../../shared/product/product.component";
import { AbstractProductSelector } from "../abstract-product-selector";
import { KeypadService } from "../../services";
import { PosSyncService } from "src/app/services/pos-sync.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent
  extends AbstractProductSelector
  implements OnInit, OnDestroy
{
  filterForm: FormGroup;
  formCtrlSub: Subscription;
  dataSource = new MatTableDataSource();
  textSearch = false;

  @Input() isBarcode: boolean = false;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    workspaceService: WorkspaceService,
    productService: ProductService,
    posService: PosService,
    inventoryService: InventoryService,
    posSyncService: PosSyncService,
    private keypadService: KeypadService,
    dialog: MatDialog,
    private authService: AuthService,
    private fb: UntypedFormBuilder
  ) {
    super(
      workspaceService,
      productService,
      posService,
      inventoryService,
      posSyncService,
      dialog
    );
    this.filterForm = this.fb.group({
      filter: [],
    });
    this.formCtrlSub = this.filterForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe((newValue) => this.applyFilter(newValue.filter));
  }

  override ngOnInit() {
    super.ngOnInit();

    if (this.showInventory) {
      this.inventoryService
        .getInventory(this.workspaceService.getWarehouseOid())
        .subscribe((_entries) => {
          this.inventory = _entries;
        });
    }
  }

  get displayedColumns(): string[] {
    return this.showInventory
      ? ["sku", "description", "stock", "cmd"]
      : ["sku", "description", "cmd"];
  }

  applyFilter(_filterValue: string) {
    this.productService
      .findProducts(_filterValue, this.textSearch)
      .subscribe((_products) => {
        this.dataSource.data = _products;
        this.dataSource.sort = this.sort;
      });
  }

  show(_product: Product) {
    const dialogRef = this.dialog.open(ProductComponent, {
      data: _product,
    });
  }

  selectable(_product: Product) {
    return this.hasStock(_product) || this.authService.hasRole(Roles.ADMIN);
  }

  ngOnDestroy() {
    this.formCtrlSub.unsubscribe();
  }

  onBlur() {
    this.keypadService.activate();
  }

  onFocus() {
    this.keypadService.deactivate();
  }

  override select(product: Product) {
    if (!this.isBarcode) {
      super.select(product);
    }
  }
  setTextSearch() {
    this.textSearch = !this.textSearch;
    this.applyFilter(this.filterForm.value["filter"]);
  }
}
