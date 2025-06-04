import {
  ChangeDetectorRef,
  Component,
  inject,
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
  AuthService,
  ContactService,
  DocStatus,
  DocumentService,
  Order,
  OrderWrapper,
  PaymentService,
  Permission,
  PosService,
  WorkspaceService,
} from "@efaps/pos-library";

import { Subscription } from "rxjs";
import { debounceTime, map } from "rxjs/operators";

import { ConfirmDialogComponent } from "../../shared/confirm-dialog/confirm-dialog.component";
import { ReassignDialogComponent } from "../reassign-dialog/reassign-dialog.component";
import { SplitOrderDialogComponent } from "../split-order-dialog/split-order-dialog.component";

@Component({
  selector: "app-order-table",
  templateUrl: "./order-table.component.html",
  styleUrls: ["./order-table.component.scss"],
  standalone: false,
})
export class OrderTableComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private authService = inject(AuthService);
  private documentService = inject(DocumentService);
  private posService = inject(PosService);
  private workspaceService = inject(WorkspaceService);
  private paymentService = inject(PaymentService);
  private contactService = inject(ContactService);
  private fb = inject(FormBuilder);
  private dialog = inject(MatDialog);
  private changeDetectorRefs = inject(ChangeDetectorRef);

  DocStatus = DocStatus;
  filterForm: FormGroup;
  formCtrlSub!: Subscription;
  displayedColumns: string[] = ["number", "date", "total", "status", "cmd"];
  dataSource = new MatTableDataSource<OrderTableRow>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  isAdmin = false;
  allowPayment = false;
  allowPos = false;
  @LocalStorage() lazyLoadOrders = false;
  private subscriptions = new Subscription();
  private displayContact = false;

  constructor() {
    this.filterForm = this.fb.group({
      filter: [],
      preload: [],
    });
  }

  ngOnInit() {
    if (this.workspaceService.showSpots()) {
      this.displayedColumns.splice(4, 0, "spot");
    }
    this.isAdmin = this.authService.hasPermission(Permission.ADMIN);
    this.allowPayment =
      this.workspaceService.allowPayment() &&
      this.authService.hasPermission(Permission.COLLECT);
    this.allowPos = this.authService.hasPermission(Permission.ORDER);

    this.formCtrlSub = this.filterForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe((newValue) => this.applyFilter(newValue.filter));
    this.initTable();
  }

  ngOnDestroy() {
    this.formCtrlSub.unsubscribe();
    this.subscriptions.unsubscribe();
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
          this.dataSource = new MatTableDataSource<OrderTableRow>();
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
      this.dataSource = new MatTableDataSource<OrderTableRow>();
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
      this.dataSource = new MatTableDataSource<OrderTableRow>();
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
              return this.getRow(orders, order);
            }),
          ),
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

  private getRow(orders: Order[], order: Order): OrderTableRow {
    const row = {
      ...order,
      spotLabel: this.evalSpotLabel(orders, order),
      multiple: this.evalMultiple(orders, order),
      contactLabel: undefined,
    };
    this.evalContact(row);
    return row;
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
              return this.getRow(orders, order);
            }),
          ),
        )
        .subscribe((orderWrappers) => {
          this.dataSource.data = orderWrappers;
          this.dataSource.sortingDataAccessor = (data, sortHeaderId) => {
            switch (sortHeaderId) {
              case "spot":
                return data.spotLabel;
              default:
                let crit = data[sortHeaderId as keyof OrderTableRow];
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

  evalContact(row: OrderTableRow) {
    if (row.contactOid || row.shoutout) {
      if (!this.displayContact) {
        this.displayContact = true;
        this.displayedColumns.splice(3, 0, "contact");
      }
      if (row.contactOid) {
        this.contactService.getContact(row.contactOid).subscribe({
          next: (contact) => (row.contactLabel = contact.name),
        });
      } else {
        row.contactLabel = row.shoutout;
      }
    }
  }
}
interface OrderTableRow extends OrderWrapper {
  contactLabel?: string;
}
