import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTabChangeEvent } from "@angular/material/tabs";
import {
  Category,
  CategoryNode,
  Currency,
  InventoryService,
  PosService,
  Product,
  ProductService,
  WorkspaceFlag,
  WorkspaceService,
  hasFlag,
} from "@efaps/pos-library";
import { Subscription } from "rxjs";
import { KeypadService, PosSyncService } from "src/app/services";

import { AbstractProductSelector } from "../abstract-product-selector";

@Component({
    selector: "app-product-grid",
    templateUrl: "./product-grid.component.html",
    styleUrls: ["./product-grid.component.scss"],
    standalone: false
})
export class ProductGridComponent
  extends AbstractProductSelector
  implements OnInit, OnDestroy
{
  categories: CategoryNode[] = [];
  selectedIndex = 0;
  currentCurrency: Currency = Currency.PEN;
  //size = 'small';
  //size = 'medium' | big;
  size = "large";
  showPrices = true;

  currentCategory: CategoryNode | undefined;
  products: Product[] = [];

  private subscription$ = new Subscription();

  constructor(
    workspaceService: WorkspaceService,
    productService: ProductService,
    posService: PosService,
    inventoryService: InventoryService,
    posSyncService: PosSyncService,
    keypadService: KeypadService,
    dialog: MatDialog,
  ) {
    super(
      workspaceService,
      productService,
      posService,
      inventoryService,
      posSyncService,
      keypadService,
      dialog,
    );
  }

  override ngOnInit() {
    super.ngOnInit();
    this.subscription$.add(
      this.productService.getCategoryTree().subscribe({
        next: (_categories) => {
          this.categories = _categories;
        },
      }),
    );

    this.workspaceService.currentWorkspace.subscribe({
      next: (workspace) => {
        if (workspace) {
          this.showPrices = hasFlag(workspace, WorkspaceFlag.gridShowPrice);
          this.size = workspace.gridSize
            ? workspace.gridSize.toLowerCase()
            : "large";
          if (this.showPrices) {
            this.subscription$.add(
              this.posService.currentCurrency.subscribe({
                next: (currency) => (this.currentCurrency = currency),
              }),
            );
          }
          if (this.showInventory) {
            this.inventoryService
              .getInventory(this.workspaceService.getWarehouseOid())
              .subscribe((_entries) => {
                this.inventory = _entries;
              });
          }
        }
      },
    });
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  tabChanged(event: MatTabChangeEvent): void {
    this.currentCategory = this.categories[event.index];
    event.tab.isActive;
    this.productService
      .getProductsByCategory(this.currentCategory.oid)
      .subscribe({
        next: (products) => (this.products = products),
      });
  }

  onChildCategorySelected(childCategory: Category) {
    if (childCategory == null) {
      this.productService
        .getProductsByCategory(this.currentCategory!!.oid)
        .subscribe({
          next: (products) => (this.products = products),
        });
    } else {
      this.products = [];
    }
  }
}
