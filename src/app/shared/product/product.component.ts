import { CdkScrollable } from "@angular/cdk/scrolling";
import { Component, OnInit, inject, signal } from "@angular/core";
import { MatButton } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from "@angular/material/dialog";
import { MatLine } from "@angular/material/grid-list";
import { MatList, MatListItem } from "@angular/material/list";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import {
  Currency,
  InventoryEntry,
  InventoryService,
  PosLibraryModule,
  PosService,
  Product,
  Product2Category,
  ProductRelation,
  ProductService,
  ProductType,
  RelationEntry,
  WorkspaceService,
} from "@efaps/pos-library";

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

  product = signal<Product>({
        oid: "N/A",
        sku: "",
        type: ProductType.STANDART,
        description: "",
        note: "",
        imageOid: "",
        netPrice: 0,
        crossPrice: 0,
        currency: Currency.PEN,
        categories: [],
        taxes: [],
        relations: [],
        indicationSets: [],
        barcodes: [],
        bomGroupConfigs: [],
        configurationBOMs: [],
  });  
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
      this.product.set(product);
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
