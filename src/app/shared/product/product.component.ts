import { Component, OnInit, inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from "@angular/material/dialog";
import { Currency, InventoryEntry, InventoryService, PosService, Product, Product2Category, ProductRelation, ProductService, ProductType, RelationEntry, WorkspaceService, PosLibraryModule } from "@efaps/pos-library";
import { CdkScrollable } from "@angular/cdk/scrolling";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatList, MatListItem } from "@angular/material/list";
import { MatLine } from "@angular/material/grid-list";
import { MatButton } from "@angular/material/button";

@Component({
    selector: "app-product",
    templateUrl: "./product.component.html",
    styleUrls: ["./product.component.scss"],
    imports: [
        MatDialogTitle,
        CdkScrollable,
        MatDialogContent,
        MatProgressSpinner,
        MatList,
        MatListItem,
        MatLine,
        MatDialogActions,
        MatButton,
        MatDialogClose,
        PosLibraryModule,
    ],
})
export class ProductComponent implements OnInit {
  private productService = inject(ProductService);
  private posService = inject(PosService);
  private workspaceService = inject(WorkspaceService);
  private inventoryService = inject(InventoryService);
  private data = inject(MAT_DIALOG_DATA);

  product!: Product;
  currentCurrency: Currency = Currency.PEN;
  categories: string[] = [];
  loading: boolean = true;
  showInventory: boolean = false;
  isStockable: boolean = false;
  inventory: InventoryEntry[] = [];
  relations: RelationEntry[] = [];

  ngOnInit() {
    this.showInventory = this.workspaceService.showInventory();
    this.posService.currentCurrency.subscribe(
      (_data) => (this.currentCurrency = _data),
    );
    this.productService.getProduct(this.data.oid).subscribe((product) => {
      this.product = product;
      this.isStockable = ProductService.isStockable(product);
      this.evalCategories(product.categories);
      this.loading = false;
      this.evalRelations(product.relations);
      this.evalInventory(product);
    });
  }

  private evalRelations(_productRelations: ProductRelation[]) {
    for (const relation of _productRelations) {
      this.productService
        .getProduct(relation.productOid)
        .subscribe((product) => {
          let label;
          if (relation.label == null) {
            switch (relation.type) {
              case "BATCH":
                label = product.type == ProductType.BATCH ? "Lote" : "Base";
                break;
              default:
                label = "";
            }
          } else {
            label = relation.label;
          }
          this.relations.push({
            label,
            product,
          });
        });
    }
  }

  private evalCategories(categories: Product2Category[]) {
    for (const prod2cat of categories) {
      this.productService
        .getCategory(prod2cat.categoryOid)
        .subscribe((category) => {
          this.categories.push(category.name);
        });
    }
  }

  private evalInventory(product: Product) {
    if (this.showInventory && this.isStockable) {
      this.inventoryService
        .getInventory4Product(product.oid)
        .subscribe((_entry) => {
          _entry.forEach((inv) => this.inventory.push(inv));
        });
    }
  }
}
