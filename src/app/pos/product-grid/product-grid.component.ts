import {
  Component,
  OnDestroy,
  OnInit,
  inject,
  model,
  signal,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import {
  MatTab,
  MatTabChangeEvent,
  MatTabContent,
  MatTabGroup,
} from "@angular/material/tabs";
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

import { AbstractProductSelector } from "../abstract-product-selector";
import { GridElementComponent } from "./grid-element/grid-element.component";
import { ProductsElementComponent } from "./products-element/products-element.component";
import { KeypadService, PosSyncService } from "src/app/services";

@Component({
  selector: "app-product-grid",
  templateUrl: "./product-grid.component.html",
  styleUrls: ["./product-grid.component.scss"],
  imports: [
    MatTabGroup,
    MatTab,
    MatTabContent,
    GridElementComponent,
    ProductsElementComponent,
  ],
})
export class ProductGridComponent
  extends AbstractProductSelector
  implements OnInit, OnDestroy
{
  categories = signal<CategoryNode[]>([]);
  selectedIndex = model<number>();
  currentCurrency: Currency = Currency.PEN;
  //size = 'small';
  //size = 'medium' | big;
  size = "large";
  showPrices = true;

  currentCategory = signal<CategoryNode | undefined>(undefined);
  products = signal<Product[]>([]);

  private subscription$ = new Subscription();

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
    this.productService.getCategoryTree().subscribe({
      next: (categories) => {
        this.categories.set(categories);
        if (this.categories()[0]) {
          this.currentCategory.set(this.categories()[0]);
          this.loadProducts(this.currentCategory()!!.oid);
        }
      },
    });
  }

  override ngOnInit() {
    super.ngOnInit();
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
    this.currentCategory.set(this.categories()[event.index]);
    this.loadProducts(this.currentCategory()!!.oid);
  }

  onChildCategorySelected(childCategory: Category) {
    if (childCategory == null) {
      this.loadProducts(this.currentCategory()!!.oid);
    } else {
      this.products.set([]);
    }
  }

  loadProducts(categoryOid: string) {
    this.productService.getProductsByCategory(categoryOid).subscribe({
      next: (products) => this.products.set(products),
    });
  }
}
