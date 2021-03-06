import { Directive, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import {
  InventoryEntry,
  InventoryService,
  Item,
  PosService,
  Product,
  ProductService,
  ProductType,
  WorkspaceService,
} from "@efaps/pos-library";

import { RemarkDialogComponent } from "./remark-dialog/remark-dialog.component";

@Directive()
export abstract class AbstractProductSelector implements OnInit {
  ticket: Item[];
  @Input() multiplier: number;
  @Input() remarkMode = false;
  @Output() selection = new EventEmitter<number>();

  showInventory = false;
  inventory: InventoryEntry[] = [];

  constructor(
    protected workspaceService: WorkspaceService,
    protected productService: ProductService,
    protected posService: PosService,
    protected inventoryService: InventoryService,
    protected dialog: MatDialog
  ) {}

  ngOnInit() {
    this.posService.currentTicket.subscribe(
      (_ticket) => (this.ticket = _ticket)
    );
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
    } else {
      this.selectProduct(product, null);
    }
  }

  private selectProduct(product: Product, remark: string) {
    const quantity = this.multiplier > 0 ? this.multiplier : 1;
    this.ticket.push({
      product: product,
      quantity: quantity,
      price: 0,
      remark: remark,
    });
    this.syncTicket();
    this.selection.emit(0);
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
}
