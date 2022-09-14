import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
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
import { PosSyncService } from "src/app/services/pos-sync.service";
import { AbstractProductSelector } from "../../abstract-product-selector";

@Component({
  selector: "app-products-element",
  templateUrl: "./products-element.component.html",
  styleUrls: ["./products-element.component.scss"],
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
    dialog: MatDialog
  ) {
    super(
      workspaceService,
      productService,
      posService,
      inventoryService,
      posSyncService,
      dialog
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
