import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from "@angular/core";
import { MatTabChangeEvent, MatTabGroup, MatTab, MatTabLabel } from "@angular/material/tabs";
import {
  Category,
  CategoryNode,
  Currency,
  InventoryEntry,
  Product,
  ProductService,
} from "@efaps/pos-library";
import { MatIcon } from "@angular/material/icon";
import { ProductsElementComponent } from "../products-element/products-element.component";

const placeHolder: CategoryNode = {
  oid: "",
  name: "PLACEHOLDER",
  children: [],
};

@Component({
    selector: "app-grid-element",
    templateUrl: "./grid-element.component.html",
    styleUrls: ["./grid-element.component.scss"],
    imports: [
        MatTabGroup,
        MatTab,
        MatTabLabel,
        MatIcon,
        ProductsElementComponent,
    ],
})
export class GridElementComponent implements OnInit {
  private productService = inject(ProductService);

  _categories: CategoryNode[] = [];

  @Output() categorySelected = new EventEmitter<CategoryNode>();
  @Input()
  currency: Currency = Currency.PEN;
  @Input() remarkMode = false;
  @Input() showInventory = false;
  @Input() size = "large";
  @Input() showPrices = true;
  @Input() inventory: InventoryEntry[] = [];

  selectedTabIndex = 0;
  currentCategory!: CategoryNode;
  products: Product[] = [];

  ngOnInit(): void {}

  tabChanged(event: MatTabChangeEvent) {
    const category = this._categories[event.index];
    this.categorySelected.emit(category);
    this.currentCategory = this.categories[event.index];
    if (this.currentCategory) {
      this.productService
        .getProductsByCategory(this.currentCategory.oid)
        .subscribe({
          next: (products) => (this.products = products),
        });
    } else {
      this.products = [];
    }
  }

  @Input()
  set categories(categories: CategoryNode[]) {
    placeHolder.oid = categories[0].parentOid!;
    this._categories = [placeHolder].concat(categories);
    this.selectedTabIndex = 0;
  }

  get categories() {
    return this._categories;
  }

  onChildCategorySelected(childCategory: Category) {
    if (childCategory == null) {
      this.productService
        .getProductsByCategory(this.currentCategory.oid)
        .subscribe({
          next: (products) => (this.products = products),
        });
    } else {
      this.products = [];
    }
  }
}
