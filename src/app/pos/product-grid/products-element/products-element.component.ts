import { Component, Input, inject } from "@angular/core";
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
  }

  override get inventory(): InventoryEntry[] {
    return super.inventory;
  }

  @Input()
  override set inventory(inventory: InventoryEntry[]) {
    super.inventory = inventory;
  }
}
