import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { LocalStorage } from "@efaps/ngx-store";
import {
  DocStatus,
  DocumentService,
  Order,
  OrderWrapper,
  PaymentService,
  PosService,
  WorkspaceService,
} from "@efaps/pos-library";
import { AuthService, Roles } from "@efaps/pos-library";
import { Subscription } from "rxjs";
import { debounceTime, map } from "rxjs/operators";

import { ConfirmDialogComponent } from "../../shared/confirm-dialog/confirm-dialog.component";
import { ReassignDialogComponent } from "../reassign-dialog/reassign-dialog.component";
import { SplitOrderDialogComponent } from "../split-order-dialog/split-order-dialog.component";

@Component({
  selector: "app-order-table",
  templateUrl: "./order-table.component.html",
  styleUrls: ["./order-table.component.scss"],
})
export class OrderTableComponent implements OnInit, OnDestroy {
  DocStatus = DocStatus;
  filterForm: FormGroup;
  formCtrlSub!: Subscription;
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<OrderWrapper>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  isAdmin = false;
  allowPayment = false;
  @LocalStorage() lazyLoadOrders = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private documentService: DocumentService,
    private posService: PosService,
    private workspaceService: WorkspaceService,
    private paymentService: PaymentService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef
  ) {
    this.filterForm = this.fb.group({
      filter: [],
      preload: [],
    });
  }

  ngOnInit() {
    this.displayedColumns = this.workspaceService.showSpots()
      ? ["number", "date", "total", "status", "spot", "cmd"]
      : ["number", "date", "total", "status", "cmd"];
    this.isAdmin = this.authService.hasRole(Roles.ADMIN);
    this.allowPayment = this.workspaceService.allowPayment();

    this.formCtrlSub = this.filterForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe((newValue) => this.applyFilter(newValue.filter));
    this.initTable();
  }

  ngOnDestroy() {
    this.formCtrlSub.unsubscribe();
  }

  pos(_order: Order) {
    this.posService.setOrder(_order);
    this.router.navigate(["/pos"]);
  }

  payment(_order: Order) {
    const order = Object.assign({ type: "ORDER" }, _order);
    this.paymentService.updateDocument(order);
    this.router.navigate(["/payment"]);
  }

  delete(_order: Order) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "250px",
      data: { title: "Are you sure?" },
    });

    dialogRef.afterClosed().subscribe((_result) => {
      if (_result) {
        this.documentService.deleteOrder(_order).subscribe(() => {
          this.dataSource = new MatTableDataSource<OrderWrapper>();
          this.ngOnInit();
          this.changeDetectorRefs.detectChanges();
        });
      }
    });
  }

  split(order: Order) {
    const dialogRef = this.dialog.open(SplitOrderDialogComponent, {
      width: "90%",
      minHeight: "200",
      maxHeight: "90vh",
      data: order,
    });
    dialogRef.afterClosed().subscribe((_result) => {
      this.dataSource = new MatTableDataSource<OrderWrapper>();
      this.ngOnInit();
      this.changeDetectorRefs.detectChanges();
    });
  }

  reassign(order: Order) {
    const dialogRef = this.dialog.open(ReassignDialogComponent, {
      width: "90%",
      minHeight: "200",
      maxHeight: "90vh",
      data: order,
    });
    dialogRef.afterClosed().subscribe((_result) => {
      this.dataSource = new MatTableDataSource<OrderWrapper>();
      this.ngOnInit();
      this.changeDetectorRefs.detectChanges();
    });
  }

  toggleLazyLoadOrders(_toggle: MatSlideToggleChange) {
    this.lazyLoadOrders = !this.lazyLoadOrders;
    this.initTable();
  }

  applyFilter(_filterValue: string) {
    if (this.lazyLoadOrders) {
      this.documentService
        .findOrders(_filterValue)
        .pipe(
          map((orders) =>
            orders.map((order) => {
              return this.getOrderWrapper(orders, order);
            })
          )
        )
        .subscribe((orderWrappers) => {
          this.dataSource.data = orderWrappers;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        });
    } else {
      _filterValue = _filterValue.trim();
      _filterValue = _filterValue.toLowerCase();
      this.dataSource.filter = _filterValue;
    }
  }

  private getOrderWrapper(orders: Order[], order: Order): OrderWrapper {
    return {
      ...order,
      spotLabel: this.evalSpotLabel(orders, order),
      multiple: this.evalMultiple(orders, order),
    };
  }

  initTable() {
    if (this.lazyLoadOrders) {
      this.dataSource.data = [];
    } else {
      this.documentService
        .getOpenOrders()
        .pipe(
          map((orders) =>
            orders.map((order) => {
              return this.getOrderWrapper(orders, order);
            })
          )
        )
        .subscribe((orderWrappers) => {
          this.dataSource.data = orderWrappers;
          this.dataSource.sortingDataAccessor = (data, sortHeaderId) => {
            switch (sortHeaderId) {
              case "spot":
                return data.spotLabel;
              default:
                let crit = data[sortHeaderId as keyof OrderWrapper];
                if (typeof crit === "string") {
                  return crit;
                } else if (typeof crit === "number") {
                  return crit;
                }
                return 0;
            }
          };
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        });
    }
  }

  private evalSpotLabel(orders: Order[], order: Order) {
    if (!order.spot) {
      return "";
    }
    const relatedOrders = orders
      .filter((item) => {
        return item.spot && item.spot.id == order.spot!.id;
      })
      .sort((o1, o2) => {
        if (o1.number! < o2.number!) {
          return -1;
        }
        if (o1.number! > o2.number!) {
          return 1;
        }
        return 0;
      });
    if (relatedOrders.length < 2) {
      return order.spot.label;
    }
    var index = relatedOrders.indexOf(order);
    return `${order.spot.label} - ${index + 1}`;
  }

  private evalMultiple(orders: Order[], order: Order): boolean {
    return (
      order.spot != undefined &&
      orders.filter((item) => {
        return item.spot && item.spot.id == order.spot!.id;
      }).length > 1
    );
  }
}
