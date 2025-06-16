import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from "@angular/core";
import {
  FormGroup,
  ReactiveFormsModule,
  UntypedFormBuilder,
} from "@angular/forms";
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
import {
  AuthService,
  InventoryService,
  Permission,
  PosService,
  Product,
  ProductService,
  WorkspaceService,
} from "@efaps/pos-library";
import { Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";

import { NgClass } from "@angular/common";
import { MatIconButton } from "@angular/material/button";
import { MatFormField } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { MatSlideToggle } from "@angular/material/slide-toggle";
import { PosSyncService } from "src/app/services/pos-sync.service";
import { KeypadService } from "../../services";
import { ProductComponent } from "../../shared/product/product.component";
import { AbstractProductSelector } from "../abstract-product-selector";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatSlideToggle,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatSortHeader,
    MatCellDef,
    MatCell,
    NgClass,
    MatIconButton,
    MatIcon,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
  ],
})
export class ProductListComponent
  extends AbstractProductSelector
  implements OnInit, OnDestroy
{
  private authService = inject(AuthService);
  private fb = inject(UntypedFormBuilder);

  filterForm: FormGroup;
  formCtrlSub: Subscription;
  dataSource = new MatTableDataSource();
  textSearch = false;

  @Input() isBarcode: boolean = false;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor() {
    const workspaceService = inject(WorkspaceService);
    const productService = inject(ProductService);
    const posService = inject(PosService);
    const inventoryService = inject(InventoryService);
    const posSyncService = inject(PosSyncService);
    const keypadService = inject(KeypadService);
    const dialog = inject(MatDialog);

    super(
      workspaceService,
      productService,
      posService,
      inventoryService,
      posSyncService,
      keypadService,
      dialog,
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
    return (
      !this.isStockable(_product) ||
      this.hasStock(_product) ||
      this.authService.hasPermission(Permission.ADMIN)
    );
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
