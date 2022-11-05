import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { LocalStorage } from "@efaps/ngx-store";
import {
  AuthService,
  BarcodeScannerService,
  Contact,
  ContactService,
  hasFlag,
  Item,
  MsgService,
  PartListService,
  PosLayout,
  PosService,
  Product,
  ProductService,
  WorkspaceFlag,
  WorkspaceService,
} from "@efaps/pos-library";
import { combineLatest, Subscription } from "rxjs";
import { skip } from "rxjs/operators";
import { PosSyncService } from "../services/pos-sync.service";

import { CategorySelectComponent } from "./category-select/category-select.component";
import { CommandsComponent } from "./commands/commands.component";
import { ContactDialogComponent } from "./contact-dialog/contact-dialog.component";
import { ProductGridComponent } from "./product-grid/product-grid.component";
import { ProductListComponent } from "./product-list/product-list.component";

@Component({
  selector: "app-pos",
  templateUrl: "./pos.component.html",
  styleUrls: ["./pos.component.scss"],
})
export class PosComponent implements AfterContentChecked, OnInit, OnDestroy {
  PosLayout = PosLayout;
  ticket: Item[] = [];
  screenHeight: number = 0;
  screenWidth: number = 0;
  private orderId: string | null = null;
  currentLayout: PosLayout = PosLayout.GRID;
  @LocalStorage() posLayouts: any = {};
  numPad = false;
  @LocalStorage() posNumPad: any = {};
  multiplierLabel = "";
  @ViewChild(CommandsComponent, { static: true }) cmdComp!: CommandsComponent;
  @ViewChild(ProductGridComponent) productGrid:
    | ProductGridComponent
    | undefined;
  @ViewChild(ProductListComponent) productList:
    | ProductListComponent
    | undefined;
  remarkMode = false;
  private subscriptions = new Subscription();
  isBarcode = false;
  private requiresContact = false;
  private _contact: Contact | null = null;

  constructor(
    public workspaceService: WorkspaceService,
    private posService: PosService,
    private msgService: MsgService,
    private authService: AuthService,
    private barcodeScannerService: BarcodeScannerService,
    private productService: ProductService,
    private partListService: PartListService,
    private posSyncService: PosSyncService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private contactService: ContactService,
    @Inject(ChangeDetectorRef) private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.posService.currentTicket.subscribe((data) => {
        this.ticket = data;
      })
    );
    this.onResize();
    this.msgService.init();

    this.subscriptions.add(
      combineLatest({
        order: this.posService.currentOrder,
        workspace: this.workspaceService.currentWorkspace,
      }).subscribe({
        next: ({ order, workspace }) => {
          this.requiresContact = hasFlag(
            workspace,
            WorkspaceFlag.orderRequiresContact
          );
          if (order && !this.orderId) {
            this.msgService.publishStartEditOrder(order.id!);
            this.orderId = order.id;
            if (order.contactOid) {
              this.contactService.getContact(order.contactOid).subscribe({
                next: (contactResp) => {
                  this.contact = contactResp;
                  this.posService.contactOid =
                    contactResp.oid == null ? contactResp.id : contactResp.oid;
                  this.assignContact(false);
                },
              });
            } else {
              this.contact = null;
              this.assignContact(false);
            }
          } else {
            this.contact = null;
            this.assignContact(false);
          }
        },
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
    this.posSyncService.afterProductSelected.subscribe({
      next: () => {
        this.afterSelection();
      },
    });
  }

  assignContact(update: boolean) {
    if (update || (this.requiresContact && this.contact == null)) {
      const ref = this.dialog.open(ContactDialogComponent, {
        disableClose: true,
      });
      ref.afterClosed().subscribe({
        next: (contactOid) => {
          if (contactOid) {
            this.contact = contactOid;
          } else {
            this.router.navigate(["orders"]);
          }
        },
      });
    }
  }

  set contact(contact: Contact | null) {
    if (contact == null) {
      this._contact = null;
      this.posService.contactOid = null;
    } else {
      this._contact = contact;
      this.posService.contactOid =
        contact.oid == null ? contact.id : contact.oid;
    }
  }

  get contact() {
    return this._contact;
  }

  ngAfterContentChecked() {
    this.changeDetectorRef.detectChanges();
    this.cmdComp.evalSticky();
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
            } else if (this.productList) {
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
    this.subscriptions.unsubscribe();
    if (this.orderId) {
      this.msgService.publishFinishEditOrder(this.orderId);
      this.posService.reset();
    }
  }

  @HostListener("window:resize", ["$event"])
  onResize(_event?: undefined) {
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
    this.posService.setMultiplier(Number(this.multiplierLabel));
  }

  afterSelection() {
    this.resetMultiplier();
    if (this.remarkMode) {
      this.toggleRemarkMode();
    }
  }

  resetMultiplier() {
    this.posService.setMultiplier(Number(0));
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
