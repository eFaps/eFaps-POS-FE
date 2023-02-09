import { Directive, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import {
  InventoryEntry,
  InventoryService,
  Item,
  PosService,
  Product,
  ProductService,
  WorkspaceService,
} from "@efaps/pos-library";
import { PosSyncService } from "../services/pos-sync.service";
import { ConfigDialogComponent } from "./config-dialog/config-dialog.component";

import { RemarkDialogComponent } from "./remark-dialog/remark-dialog.component";

@Directive()
export abstract class AbstractProductSelector implements OnInit {
  ticket: Item[] = [];
  multiplier: number = 1;
  @Input() remarkMode = false;

  showInventory = false;
  scanning: boolean = false;
  _inventory: InventoryEntry[] = [];

  constructor(
    protected workspaceService: WorkspaceService,
    protected productService: ProductService,
    protected posService: PosService,
    protected inventoryService: InventoryService,
    protected posSyncService: PosSyncService,
    protected dialog: MatDialog
  ) {}

  ngOnInit() {
    this.posService.currentTicket.subscribe(
      (_ticket) => (this.ticket = _ticket)
    );
    this.posService.multiplier.subscribe({
      next: (multiplier) => (this.multiplier = multiplier),
    });
    this.showInventory = this.workspaceService.showInventory();
  }

  select(product: Product) {
    if (this.remarkMode || product.indicationSets.some((set) => set.required)) {
      const dialogRef = this.dialog.open(RemarkDialogComponent, {
        data: product,
      });
      dialogRef.afterClosed().subscribe({
        next: (comment) => {
          this.selectProduct(product, comment);
        },
      });
    } else if (product.bomGroupConfigs.length > 0) {
      const dialogRef = this.dialog.open(ConfigDialogComponent, {
        data: product,
      });
      dialogRef.afterClosed().subscribe({
        next: (comment) => {
          this.selectProduct(product, comment);
        },
      });
    } else {
      this.selectProduct(product, null);
    }
  }

  private selectProduct(product: Product, remark: string | null) {
    const quantity = this.multiplier > 0 ? this.multiplier : 1;
    this.ticket.push({
      product: product,
      quantity: quantity,
      price: 0,
      remark: remark,
      currency: this.posService.currency,
      exchangeRate: this.posService.exchangeRate,
    });
    this.syncTicket();
    this.posSyncService.productSelected();
  }

  syncTicket() {
    this.posService.changeTicket(this.ticket);
  }

  isStockable(product: Product): boolean {
    return ProductService.isStockable(product);
  }

  stock(_product: Product): number {
    if (!this.showInventory) {
      return 0;
    }
    const inventoryEntry = this.inventory.find(
      (entry) => entry.product.oid === _product.oid
    );
    return inventoryEntry ? inventoryEntry.quantity : 0;
  }

  hasStock(product: Product): boolean {
    return this.stock(product) > 0;
  }

  get inventory(): InventoryEntry[] {
    return this._inventory;
  }

  set inventory(inventory: InventoryEntry[]) {
    this._inventory = inventory;
  }
}
