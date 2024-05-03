import { Directive, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import {
  InventoryEntry,
  InventoryService,
  Item,
  PosService,
  Product,
  ProductIndividual,
  ProductRelationType,
  ProductService,
  ProductType,
  WorkspaceService,
} from "@efaps/pos-library";
import { KeypadService, PosSyncService } from "../services";
import { ConfigDialogComponent } from "./config-dialog/config-dialog.component";

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
    protected keypadService: KeypadService,
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
    if (
      this.remarkMode ||
      product.indicationSets.some((set) => set.required) ||
      product.bomGroupConfigs.length > 0 ||
      this.isSelectIndividual(product)
    ) {
      this.keypadService.deactivate();
      const dialogRef = this.dialog.open(ConfigDialogComponent, {
        data: {
          product: product,
          remarkMode: this.remarkMode,
        },
        minWidth: "50%",
      });
      dialogRef.afterClosed().subscribe({
        next: (selection) => {
          this.keypadService.activate();
          this.selectProduct(
            product,
            selection.selectedIndividual,
            selection.remark,
            selection.childProducts
          );
        },
        error: (err: any) => {
          this.keypadService.activate();
        },
      });
    } else {
      if (product.type == ProductType.BATCH || product.type == ProductType.INDIVIDUAL) {
        const standIn = product;
        standIn.relations
        standIn.relations
        .filter((relation) => {
          return (
            relation.type == ProductRelationType.BATCH ||
            relation.type == ProductRelationType.INDIVIDUAL
          );
        })
        .find((relation) => {
          this.productService
            .getProduct(relation.productOid)
            .subscribe({ next: (prod) => this.selectProduct(prod, standIn) });
        });
      } else {
        this.selectProduct(product);
      }
    }
  }

  private isSelectIndividual(product: Product): boolean {
    return (
      ProductType.STANDART == product.type &&
      (product.individual == ProductIndividual.BATCH ||
        product.individual == ProductIndividual.INDIVIDUAL)
    );
  }

  private selectProduct(
    product: Product,
    standIn?: Product,
    remark?: string | null,
    childProducts?: Product[] | null
  ) {
    const quantity = this.multiplier > 0 ? this.multiplier : 1;
    const idx = this.ticket.length + 1;
    this.ticket.push({
      index: idx,
      product: product,
      standIn: standIn,
      quantity: quantity,
      price: 0,
      remark: remark ? remark : null,
      currency: this.posService.currency,
      exchangeRate: this.posService.exchangeRate,
    });
    if (childProducts) {
      childProducts.forEach((childProduct) => {
        this.ticket.push({
          index: this.ticket.length + 1,
          parentIdx: idx,
          product: childProduct,
          quantity: 1,
          price: 0,
          remark: null,
          currency: this.posService.currency,
          exchangeRate: this.posService.exchangeRate,
        });
      });
    }
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
