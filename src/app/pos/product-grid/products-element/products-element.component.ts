import { Component, Input } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import {
  Currency,
  InventoryEntry,
  InventoryService,
  PosService,
  Product,
  ProductService,
  WorkspaceService,
} from "@efaps/pos-library";
import { KeypadService, PosSyncService } from "src/app/services";
import { AbstractProductSelector } from "../../abstract-product-selector";

@Component({
  selector: "app-products-element",
  templateUrl: "./products-element.component.html",
  styleUrls: ["./products-element.component.scss"],
  standalone: false,
})
export class ProductsElementComponent extends AbstractProductSelector {
  @Input()
  products: Product[] = [];
  @Input()
  currency: Currency = Currency.PEN;

  //size = 'small';
  //size = 'medium' | big;
  @Input() size = "large";
  @Input() showPrices = true;
  @Input() override showInventory = false;

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

  override get inventory(): InventoryEntry[] {
    return super.inventory;
  }

  @Input()
  override set inventory(inventory: InventoryEntry[]) {
    super.inventory = inventory;
  }
}
