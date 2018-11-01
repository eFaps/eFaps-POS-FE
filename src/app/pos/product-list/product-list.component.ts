import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { InventoryEntry, Product, Roles } from '../../model/index';
import { ProductComponent } from '../../products/product/product.component';
import { AuthService, InventoryService, PosService, ProductService, WorkspaceService } from '../../services/index';
import { AbstractProductSelector } from '../abstract-product-selector';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent
  extends AbstractProductSelector
  implements OnInit, OnDestroy {
  filterForm: FormGroup;
  formCtrlSub: Subscription;
  displayedColumns = ['sku', 'description', 'cmd'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;

  inventory: InventoryEntry[] = [];

  constructor(protected productService: ProductService,
    protected posService: PosService,
    private workspaceService: WorkspaceService,
    private inventoryService: InventoryService,
    private authService: AuthService,
    private fb: FormBuilder,
    private dialog: MatDialog) {
    super(productService, posService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.filterForm = this.fb.group({
      'filter': []
    });
    this.formCtrlSub = this.filterForm.valueChanges.pipe(
      debounceTime(500))
      .subscribe(newValue => this.applyFilter(newValue.filter));

    if (this.workspaceService.showInventory()) {
      this.inventoryService.getInventory(this.workspaceService.getWarehouseOid())
        .subscribe(_entries => {
          this.inventory = _entries;
        });
    }
  }

  applyFilter(_filterValue: string) {
    this.productService.findProducts(_filterValue)
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

  hasStock(_product: Product) {
    return this.workspaceService.showInventory()
      ? this.inventory.some(entry => entry.product.oid === _product.oid)
      : true;
  }

  ngOnDestroy() {
    this.formCtrlSub.unsubscribe();
  }
}
