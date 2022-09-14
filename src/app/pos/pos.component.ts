import {
  ChangeDetectorRef,
  Component,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { LocalStorage } from "@efaps/ngx-store";
import {
  AuthService,
  BarcodeScannerService,
  Item,
  MsgService,
  PartListService,
  PosLayout,
  PosService,
  Product,
  ProductService,
  WorkspaceService,
} from "@efaps/pos-library";
import { Subscription } from "rxjs";
import { skip } from "rxjs/operators";

import { CategorySelectComponent } from "./category-select/category-select.component";
import { CommandsComponent } from "./commands/commands.component";
import { ProductGridComponent } from "./product-grid/product-grid.component";
import { ProductListComponent } from "./product-list/product-list.component";

@Component({
  selector: "app-pos",
  templateUrl: "./pos.component.html",
  styleUrls: ["./pos.component.scss"],
})
export class PosComponent implements OnInit, OnDestroy {
  PosLayout = PosLayout;
  ticket: Item[];
  screenHeight: number;
  screenWidth: number;
  private orderId: string;
  currentLayout: PosLayout = PosLayout.GRID;
  @LocalStorage() posLayouts: any = {};
  numPad = false;
  @LocalStorage() posNumPad: any = {};
  multiplierLabel = "";
  @ViewChild(CommandsComponent, { static: true }) cmdComp;
  @ViewChild(ProductGridComponent) productGrid;
  @ViewChild(ProductListComponent) productList;
  remarkMode = false;
  private subscriptions = new Subscription();
  isBarcode = false;

  constructor(
    public workspaceService: WorkspaceService,
    private posService: PosService,
    private msgService: MsgService,
    private authService: AuthService,
    private barcodeScannerService: BarcodeScannerService,
    private productService: ProductService,
    private partListService: PartListService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    @Inject(ChangeDetectorRef) private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.posService.currentTicket.subscribe((data) => {
        this.ticket = data;
        this.changeDetectorRef.detectChanges();
        this.cmdComp.evalSticky();
      })
    );
    this.onResize();
    this.msgService.init();
    this.subscriptions.add(
      this.posService.currentOrder.subscribe((order) => {
        if (order && !this.orderId) {
          this.msgService.publishStartEditOrder(order.id);
          this.orderId = order.id;
        }
      })
    );
    if (this.workspaceService.getPosLayout() === PosLayout.BOTH) {
      const layout = this.posLayouts[this.authService.getCurrentUsername()];
      if (layout) {
        this.currentLayout = layout;
      }
    } else {
      this.currentLayout = this.workspaceService.getPosLayout();
    }
    this.numPad = this.posNumPad[this.authService.getCurrentUsername()];
    this.subscriptions.add(
      this.barcodeScannerService.barcode.pipe(skip(1)).subscribe({
        next: (barcode) => {
          if (barcode) {
            this.onBarcode(barcode);
          }
        },
      })
    );
    this.subscriptions.add(
      this.partListService.detectedPartList.subscribe({
        next: (partList) => {
          if (partList) {
            this.onPartList(partList);
          }
        },
      })
    );
  }

  onPartList(partList: Product) {
    const msg = "Paquete: " + partList.sku + "-" + partList.description;
    this.snackBar.open(msg, "", {
      duration: 1500,
      horizontalPosition: "center",
      verticalPosition: "top",
    });
  }

  onBarcode(barcode: string) {
    console.log("READ: " + barcode);
    // prevent any other clicks until we are done
    this.isBarcode = true;
    this.snackBar.open(barcode, "", {
      duration: 800,
      horizontalPosition: "center",
      verticalPosition: "top",
    });
    this.productService.getProductsByBarcode(barcode).subscribe({
      next: (products) => {
        this.isBarcode = false;
        if (products) {
          if (products.length == 1) {
            if (this.productGrid) {
              this.productGrid.select(products[0]);
            } else {
              this.productList.isBarcode = false;
              this.productList.select(products[0]);
            }
            this.afterSelection();
          } else if (products.length > 1) {
            console.log("NOT YET");
          }
        }
      },
      error: (_) => {
        this.isBarcode = false;
      },
    });
  }

  ngOnDestroy() {
    if (this.orderId) {
      this.msgService.publishFinishEditOrder(this.orderId);
    }
    this.subscriptions.unsubscribe();
  }

  @HostListener("window:resize", ["$event"])
  onResize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    this.cmdComp.evalSticky();
  }

  switchLayout() {
    if (this.currentLayout === PosLayout.GRID) {
      this.currentLayout = PosLayout.LIST;
    } else {
      this.currentLayout = PosLayout.GRID;
    }
    this.storeCurrentLayout();
  }

  private storeCurrentLayout() {
    this.posLayouts[this.authService.getCurrentUsername()] = this.currentLayout;
    this.posLayouts.save();
  }

  setMultiplier(_number: string) {
    switch (_number) {
      case "clear":
        this.multiplierLabel = "";
        break;
      default:
        this.multiplierLabel = "" + this.multiplierLabel + _number;
        break;
    }
    this.posService.setMultiplier(Number(this.multiplierLabel))
  }

  afterSelection() {
    this.resetMultiplier();
    if (this.remarkMode) {
      this.toggleRemarkMode();
    }
  }

  resetMultiplier() {
    this.posService.setMultiplier(Number(0))
    this.multiplierLabel = "";
  }

  toggleNumPad() {
    this.numPad = !this.numPad;
    this.posNumPad[this.authService.getCurrentUsername()] = this.numPad;
    this.posNumPad.save();
    this.changeDetectorRef.detectChanges();
    this.cmdComp.evalSticky();
  }

  openCatSelect() {
    let ref = this.dialog.open(CategorySelectComponent, {});
    ref.afterClosed().subscribe({
      next: (index) => {
        if (this.productGrid) {
          this.productGrid.selectedIndex = index;
        }
      },
    });
  }

  toggleRemarkMode() {
    this.remarkMode = !this.remarkMode;
  }
}
