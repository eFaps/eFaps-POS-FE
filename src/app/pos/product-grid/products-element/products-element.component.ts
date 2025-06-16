import { NgClass } from "@angular/common";
import { Component, Input, inject, input } from "@angular/core";
import { MatBadge } from "@angular/material/badge";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardTitle,
} from "@angular/material/card";
import { MatDialog } from "@angular/material/dialog";
import {
  Currency,
  InventoryEntry,
  InventoryService,
  PosLibraryModule,
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
  imports: [
    NgClass,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatBadge,
    MatCardImage,
    MatCardContent,
    PosLibraryModule,
  ],
})
export class ProductsElementComponent extends AbstractProductSelector {
  readonly products = input<Product[]>([]);
  readonly currency = input<Currency>(Currency.PEN);

  //size = 'small';
  //size = 'medium' | big;
  readonly size = input("large");
  readonly showPrices = input(true);
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
