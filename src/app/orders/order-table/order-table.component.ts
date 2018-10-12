import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatPaginator, MatSlideToggleChange, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { LocalStorage } from 'ngx-store';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { DocStatus, Order, Roles } from '../../model';
import {
  AuthService,
  DocumentService,
  PosService,
  WorkspaceService
} from '../../services';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { SplitOrderDialogComponent } from '../split-order-dialog/split-order-dialog.component';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss']
})
export class OrderTableComponent implements OnInit, OnDestroy {
  DocStatus = DocStatus;
  filterForm: FormGroup;
  formCtrlSub: Subscription;
  displayedColumns = [];
  dataSource = new MatTableDataSource<Order>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isAdmin = false;
  @LocalStorage() lazyLoadOrders = false;

  constructor(private router: Router,
    private authService: AuthService,
    private documentService: DocumentService,
    private posService: PosService,
    private workspaceService: WorkspaceService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    this.filterForm = this.fb.group({
      'filter': [],
      'preload': []
    });
    this.displayedColumns = this.workspaceService.showSpots()
      ? ['number', 'date', 'total', 'status', 'spot', 'cmd']
      : ['number', 'date', 'total', 'status', 'cmd'];
    this.isAdmin = this.authService.hasRole(Roles.ADMIN);
    this.formCtrlSub = this.filterForm.valueChanges
      .debounceTime(500)
      .subscribe(newValue => this.applyFilter(newValue.filter));
    this.initTable();
  }

  ngOnDestroy() {
    this.formCtrlSub.unsubscribe();
  }

  pos(_order: Order) {
    this.posService.setOrder(_order);
    this.router.navigate(['/pos']);
  }

  delete(_order: Order) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { title: 'Are you sure?' }
    });

    dialogRef.afterClosed().subscribe(_result => {
      if (_result) {
        this.documentService.deleteOrder(_order).subscribe(() => {
          this.dataSource = new MatTableDataSource<Order>();
          this.ngOnInit();
          this.changeDetectorRefs.detectChanges();
        });
      }
    });
  }

  split(_order: Order) {
    const dialogRef = this.dialog.open(SplitOrderDialogComponent, {
      width: '90%',
      data: _order
    });
    dialogRef.afterClosed().subscribe(_result => {
      this.dataSource = new MatTableDataSource<Order>();
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
      this.documentService.findOrders(_filterValue).subscribe(_orders => {
        this.dataSource.data = _orders;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    } else {
      _filterValue = _filterValue.trim();
      _filterValue = _filterValue.toLowerCase();
      this.dataSource.filter = _filterValue;
    }
  }

  initTable() {
    if (this.lazyLoadOrders) {
      this.dataSource.data = [];
    } else {
      this.documentService.getOpenOrders().subscribe(_orders => {
        this.dataSource.data = _orders;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    }
  }
}
