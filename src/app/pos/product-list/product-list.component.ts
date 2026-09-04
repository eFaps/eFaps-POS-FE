import { NgClass } from "@angular/common";
import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
  ChangeDetectionStrategy,
} from "@angular/core";
import {
  FormGroup,
  ReactiveFormsModule,
  UntypedFormBuilder,
} from "@angular/forms";
import { MatIconButton } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatFormField } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { MatSlideToggle } from "@angular/material/slide-toggle";
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
  MatTableDataSource,
  MatTableModule,
} from "@angular/material/table";
import { TranslatePipe } from "@ngx-translate/core";
import { Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";

import { KeypadService } from "../../services";
import { ProductComponent } from "../../shared/product/product.component";
import { AbstractProductSelector } from "../abstract-product-selector";
import {
  InventoryService,
  Permission,
  PosService,
  Product,
  ProductService,
  ProductStatus,
  WorkspaceService,
} from "@efaps/pos-library";
import { PosSyncService } from "src/app/services/pos-sync.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatSlideToggle,
    MatTableModule,
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

    if (this.showInventory && this.workspaceService.getWarehouseOid()) {
      this.inventoryService
        .getInventory(this.workspaceService.getWarehouseOid()!)
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

  applyFilter(filterValue: string) {
    let stati: [ProductStatus] | undefined = [ProductStatus.ACTIVE];
    if (this.authService.hasPermission(Permission.IGNORE_PRODUCTSTATUS)) {
      stati = undefined;
    }

    this.productService
      .findProducts(filterValue, this.textSearch, stati)
      .subscribe((products) => {
        this.dataSource.data = products;
        this.dataSource.sort = this.sort;
      });
  }

  show(product: Product) {
    this.dialog.open(ProductComponent, {
      data: product,
    });
  }

  selectable(product: Product) {
    return (
      (product.status == "ACTIVE" &&
        (!this.showInventory ||
          !this.isStockable(product) ||
          this.hasStock(product))) ||
      this.authService.hasPermission(
        Permission.IGNORE_PRODUCTSTATUS,
        Permission.OVERWRITE_STOCK,
      )
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
