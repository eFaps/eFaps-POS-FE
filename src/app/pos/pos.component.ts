import {
  ChangeDetectorRef,
  Component,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorage } from "@efaps/ngx-store";
import {
  AuthService,
  BarcodeScannerService,
  Item,
  MsgService,
  PosLayout,
  PosService,
  WorkspaceService,
} from "@efaps/pos-library";
import { Subscription } from "rxjs";
import { skip } from 'rxjs/operators';

import { CategorySelectComponent } from "./category-select/category-select.component";
import { CommandsComponent } from "./commands/commands.component";
import { ProductGridComponent } from "./product-grid/product-grid.component";

@Component({
  selector: "app-pos",
  templateUrl: "./pos.component.html",
  styleUrls: ["./pos.component.scss"]
})
export class PosComponent implements OnInit, OnDestroy {
  PosLayout = PosLayout;
  multiplierForm: FormGroup;
  ticket: Item[];
  screenHeight: number;
  screenWidth: number;
  private orderId: string;
  currentLayout: PosLayout = PosLayout.GRID;
  @LocalStorage() posLayouts: any = {};
  numPad = false;
  @LocalStorage() posNumPad: any = {};
  multiplier = 1;
  @ViewChild(CommandsComponent, { static: true }) cmdComp;
  @ViewChild(ProductGridComponent) grid;
  remarkMode = false;
  private subscriptions = new Subscription();

  constructor(
    public workspaceService: WorkspaceService,
    private posService: PosService,
    private msgService: MsgService,
    private authService: AuthService,
    private barcodeScannerService: BarcodeScannerService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    @Inject(ChangeDetectorRef) private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.multiplierForm = this.fb.group({
      multiplier: [""]
    });
    this.subscriptions.add(
      this.posService.currentTicket.subscribe(data => {
        this.ticket = data;
        this.changeDetectorRef.detectChanges();
        this.cmdComp.evalSticky();
      })
    );
    this.onResize();
    this.msgService.init();
    this.subscriptions.add(
      this.posService.currentOrder.subscribe(order => {
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
        next: barcode => {
          if (barcode) {
            console.log("READ: " + barcode);
            this.snackBar.open(barcode, '', {
              duration: 500,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          }
        }
      })
    );
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
    let multi;
    switch (_number) {
      case "clear":
        multi = "";
        break;
      default:
        multi = "" + this.multiplierForm.value.multiplier + _number;
        break;
    }
    this.multiplierForm.patchValue({ multiplier: multi });
    this.multiplier = Number(multi);
  }

  afterSelection() {
    this.resetMultiplier();
    if (this.remarkMode) {
      this.toggleRemarkMode();
    }
  }

  resetMultiplier() {
    this.multiplier = 0;
    this.multiplierForm.patchValue({ multiplier: "" });
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
      next: index => {
        if (this.grid) {
          this.grid.selectedIndex = index;
        }
      }
    });
  }

  toggleRemarkMode() {
    this.remarkMode = !this.remarkMode;
  }
}
