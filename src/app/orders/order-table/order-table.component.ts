import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

import { DocStatus, Order, Roles } from '../../model/index';
import { AuthService, DocumentService, PosService } from '../../services/index';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component'

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss']
})
export class OrderTableComponent implements OnInit {
  DocStatus = DocStatus;
  displayedColumns = ['number', 'date', 'total', 'status', 'cmd'];
  dataSource = new MatTableDataSource<Order>();
  @ViewChild(MatSort) sort: MatSort;
  isAdmin = false;
  constructor(private router: Router,
    private authService: AuthService,
    private documentService: DocumentService,
    private posService: PosService,
    private dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    this.isAdmin = this.authService.hasRole(Roles.ADMIN);
    this.documentService.getOrders().subscribe(_orders => {
      this.dataSource.data = _orders;
      this.dataSource.sort = this.sort;
    });
  }

  pos(_order: Order) {
    this.posService.changeOrder(_order);
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
}
