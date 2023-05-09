import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { MatTabChangeEvent } from "@angular/material/tabs";
import {
  Currency,
  InventoryEntry,
  PosCategory,
  Product,
} from "@efaps/pos-library";

const placeHolder: PosCategory = {
  products: [],
  categories: [],
  oid: "",
  name: "PLACEHOLDER",
};

@Component({
  selector: "app-grid-element",
  templateUrl: "./grid-element.component.html",
  styleUrls: ["./grid-element.component.scss"],
})
export class GridElementComponent implements OnInit {
  _categories: PosCategory[] = [];

  @Output() categorySelected = new EventEmitter<PosCategory>();
  @Input()
  currency: Currency = Currency.PEN;
  @Input() remarkMode = false;
  @Input() showInventory = false;
  @Input() size = "large";
  @Input() showPrices = true;
  @Input() inventory: InventoryEntry[] = [];

  selectedTabIndex = 0;
  currentCategory!: PosCategory;
  products: Product[] = [];

  constructor() {}

  ngOnInit(): void {}

  tabChanged(event: MatTabChangeEvent) {
    const category = this._categories[event.index];
    this.categorySelected.emit(category);
    this.currentCategory = this.categories[event.index];
    if (this.currentCategory) {
      this.products = this.currentCategory.products;
    } else {
      this.products = [];
    }
  }

  @Input()
  set categories(categories: PosCategory[]) {
    this._categories = [placeHolder].concat(categories);
    this.selectedTabIndex = 0;
  }

  get categories() {
    return this._categories;
  }

  onChildCategorySelected(childCategory: PosCategory) {
    if (childCategory == null) {
      this.products = this.currentCategory.products;
    } else {
      this.products = [];
    }
  }
}
