import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTabChangeEvent } from "@angular/material/tabs";
import {
  InventoryService,
  PosCategory,
  PosService,
  Product,
  ProductService,
  WorkspaceService,
} from "@efaps/pos-library";
import { Subscription } from "rxjs";

import { AbstractProductSelector } from "../abstract-product-selector";

@Component({
  selector: "app-product-grid",
  templateUrl: "./product-grid.component.html",
  styleUrls: ["./product-grid.component.scss"],
})
export class ProductGridComponent
  extends AbstractProductSelector
  implements OnInit, OnDestroy
{
  categories: PosCategory[] = [];
  selectedIndex = 0;
  currentCurrency: string;
  //size = 'small';
  //size = 'medium' | big;
  size = "large";
  showPrices = true;

  currentCategory: PosCategory;
  products: Product[] = [];

  private subscription$ = new Subscription();

  constructor(
    workspaceService: WorkspaceService,
    productService: ProductService,
    posService: PosService,
    inventoryService: InventoryService,
    dialog: MatDialog
  ) {
    super(
      workspaceService,
      productService,
      posService,
      inventoryService,
      dialog
    );
  }

  ngOnInit() {
    super.ngOnInit();
    this.subscription$.add(
      this.productService.getPosCategories().subscribe({
        next: (_categories) => {
          this.categories = _categories;
        },
      })
    );

    this.workspaceService.currentWorkspace.subscribe({
      next: (workspace) => {
        if (workspace) {
          this.showPrices = workspace.gridShowPrice;
          this.size = workspace.gridSize
            ? workspace.gridSize.toLowerCase()
            : "large";
          if (this.showPrices) {
            this.subscription$.add(
              this.posService.currentCurrency.subscribe({
                next: (currency) => (this.currentCurrency = currency),
              })
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
    this.products = this.categories[event.index].products;
    event.tab.isActive;
  }

  onChildCategorySelected(childCategory: PosCategory) {
    if (childCategory == null) {
      this.products = this.currentCategory.products;
    } else {
      this.products = [];
    }
  }
}
