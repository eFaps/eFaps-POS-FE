import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import {
  InventoryEntry,
  InventoryService,
  Product,
  ProductRelation,
  ProductService,
  RelationEntry
} from "@efaps/pos-library";
import { PosService, WorkspaceService } from "@efaps/pos-library";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"]
})
export class ProductComponent implements OnInit {
  product: Product;
  currentCurrency: string;
  categories: string[] = [];
  loading: boolean;
  showInventory: boolean;
  isStockable: boolean;
  inventory: InventoryEntry[] = [];
  relations: RelationEntry[] = [];

  constructor(
    private productService: ProductService,
    private posService: PosService,
    private workspaceService: WorkspaceService,
    private inventoryService: InventoryService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  ngOnInit() {
    this.showInventory = this.workspaceService.showInventory();
    this.loading = true;
    this.posService.currentCurrency.subscribe(
      _data => (this.currentCurrency = _data)
    );
    this.productService.getProduct(this.data.oid).subscribe(product => {
      this.product = product;
      this.isStockable = ProductService.isStockable(product);
      this.evalCategories(product.categoryOids);
      this.loading = false;
      this.evalRelations(product.relations);
      this.evalInventory(product);
    });
  }

  private evalRelations(_productRelations: ProductRelation[]) {
    for (const relation of _productRelations) {
      this.productService
        .getProduct(relation.productOid)
        .subscribe(_product => {
          this.relations.push({
            label: relation.label,
            product: _product
          });
        });
    }
  }

  private evalCategories(_categoryOids: string[]) {
    for (const oid of _categoryOids) {
      this.productService.getCategory(oid).subscribe(_category => {
        this.categories.push(_category.name);
      });
    }
  }

  private evalInventory(product: Product) {
    if (this.showInventory && this.isStockable) {
      this.inventoryService
        .getInventory4Product(product.oid)
        .subscribe(_entry => {
          _entry.forEach(inv => this.inventory.push(inv));
        });
    }
  }
}
