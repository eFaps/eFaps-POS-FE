import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
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
  Employee,
  EmployeeRelationType,
  EmployeeService,
  Item,
  MsgService,
  PartListService,
  PosLayout,
  PosService,
  Product,
  ProductService,
  UserService,
  WorkspaceFlag,
  WorkspaceService,
  hasFlag,
} from "@efaps/pos-library";
import { Subscription, combineLatest } from "rxjs";
import { skip } from "rxjs/operators";
import { KeypadService } from "../services";
import { PosSyncService } from "../services/pos-sync.service";
import {
  EmployeeDialogComponent,
  EmployeeDialogData,
} from "../shared/employee-dialog/employee-dialog.component";

import { CategorySelectComponent } from "./category-select/category-select.component";
import { CommandsComponent } from "./commands/commands.component";
import { ContactDialogComponent } from "./contact-dialog/contact-dialog.component";
import { ProductGridComponent } from "./product-grid/product-grid.component";
import { ProductListComponent } from "./product-list/product-list.component";

@Component({
  selector: "app-pos",
  templateUrl: "./pos.component.html",
  styleUrls: ["./pos.component.scss"],
  standalone: false,
})
export class PosComponent implements AfterContentChecked, OnInit, OnDestroy {
  workspaceService = inject(WorkspaceService);
  private posService = inject(PosService);
  private msgService = inject(MsgService);
  private authService = inject(AuthService);
  private barcodeScannerService = inject(BarcodeScannerService);
  private productService = inject(ProductService);
  private partListService = inject(PartListService);
  private posSyncService = inject(PosSyncService);
  private employeeService = inject(EmployeeService);
  private userService = inject(UserService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private contactService = inject(ContactService);
  private keypadService = inject(KeypadService);
  private changeDetectorRef = inject<ChangeDetectorRef>(ChangeDetectorRef);

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
  allowAssignSeller = false;
  allowAssignShoutOut = false;
  isBarcode = false;
  sticky = false;
  private subscriptions = new Subscription();
  private requiresContact = false;
  private _contact: Contact | null = null;
  private closing = false;
  private dialogRef: MatDialogRef<ContactDialogComponent, any> | undefined;
  private _seller: Employee | null = null;
  private _shoutOut: string | undefined = undefined;

  ngOnInit() {
    this.subscriptions.add(
      this.posService.currentTicket.subscribe((data) => {
        this.ticket = data;
      }),
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
            WorkspaceFlag.orderRequiresContact,
          );
          this.allowAssignSeller = hasFlag(
            workspace,
            WorkspaceFlag.assignSeller,
          );
          this.allowAssignShoutOut = hasFlag(
            workspace,
            WorkspaceFlag.assignShoutOut,
          );

          if (order && !this.orderId) {
            this.msgService.publishStartEditOrder(order.id!);
            this.orderId = order.id;
            this.shoutOut = order.shoutout;
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
            if (order.employeeRelations) {
              const relations = order.employeeRelations.filter((relation) => {
                return relation.type == EmployeeRelationType.SELLER;
              });
              if (relations.length > 0) {
                this.subscriptions.add(
                  this.employeeService
                    .getEmployee(relations[0].employeeOid)
                    .subscribe({
                      next: (employee) => (this._seller = employee),
                    }),
                );
              }
            }
          } else {
            this.contact = null;
            this.shoutOut = undefined;
            this.assignContact(false);
            if (this.allowAssignSeller) {
              this.subscriptions.add(
                this.userService.current().subscribe({
                  next: (user) => {
                    if (user.employeeOid) {
                      this.employeeService
                        .getEmployee(user.employeeOid)
                        .subscribe({
                          next: (employee) => (this.seller = employee),
                        });
                    }
                  },
                }),
              );
            }
          }
        },
      }),
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
      }),
    );
    this.subscriptions.add(
      this.partListService.detectedPartList.subscribe({
        next: (partList) => {
          if (partList) {
            this.onPartList(partList);
          }
        },
      }),
    );
    this.posSyncService.afterProductSelected.subscribe({
      next: () => {
        this.afterSelection();
      },
    });
  }

  assignContact(update: boolean) {
    if (
      update ||
      (!this.closing &&
        (this.requiresContact || this.allowAssignShoutOut) &&
        this.contact == null &&
        this.shoutOut === undefined)
    ) {
      this.keypadService.deactivate();
      this.dialogRef = this.dialog.open(ContactDialogComponent, {
        disableClose: true,
        data: {
          contact: this.requiresContact,
          shoutOut: this.allowAssignShoutOut,
        },
      });
      this.dialogRef.afterClosed().subscribe({
        next: (contactOrShoutOut) => {
          this.keypadService.activate();
          if (contactOrShoutOut) {
            if (contactOrShoutOut.oid) {
              this.contact = contactOrShoutOut;
              this.shoutOut = undefined;
            } else {
              this.contact = null;
              this.shoutOut = contactOrShoutOut;
            }
          } else {
            if (!this.allowAssignShoutOut) {
              this.router.navigate(["orders"]);
            } else {
              this.contact = null;
              this.shoutOut = undefined;
            }
          }
        },
      });
    }
  }

  set shoutOut(shoutOut: string | undefined | null) {
    if (shoutOut == null) {
      this._shoutOut = undefined;
      this.posService.shoutOut = undefined;
    } else {
      this._shoutOut = shoutOut;
      this.posService.shoutOut = shoutOut;
    }
  }

  get shoutOut() {
    return this._shoutOut;
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
    this.sticky = this.cmdComp.sticky;
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
    if (this.dialogRef) {
      this.dialogRef.close("OnDestroy");
    }
  }

  @HostListener("window:resize", ["$event"])
  onResize(_event?: undefined) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    this.cmdComp.evalSticky();
    this.sticky = this.cmdComp.sticky;
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
    this.sticky = this.cmdComp.sticky;
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

  assignSeller() {
    const data: EmployeeDialogData = {
      titel: "Assignar Vendedor",
      employee: this.seller,
    };
    let ref = this.dialog.open(EmployeeDialogComponent, {
      width: "400px",
      data,
    });
    ref.afterClosed().subscribe({
      next: (employee) => {
        if (employee) {
          this.seller = employee;
        } else if (employee === null) {
          this.seller = null;
        }
      },
    });
  }

  set seller(seller: Employee | null) {
    this.posService.removeEmployeeRelationsByType(EmployeeRelationType.SELLER);
    if (seller == null) {
      this.posService.contactOid = null;
      this._seller = null;
    } else {
      this._seller = seller;
      this.posService.addEmployeeRelation({
        employeeOid: this._seller.oid,
        type: EmployeeRelationType.SELLER,
      });
    }
  }

  get seller(): Employee | null {
    return this._seller;
  }
}
