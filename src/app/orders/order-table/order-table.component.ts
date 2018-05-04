import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Router } from '@angular/router';

import { DocumentService, PosService } from '../../services/index';
import { DocStatus, Order } from '../../model/index';

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

  constructor(private router: Router,
    private documentService: DocumentService,
    private posService: PosService) { }

  ngOnInit() {
    this.documentService.getOrders().subscribe(_orders => {
      this.dataSource.data = _orders;
      this.dataSource.sort = this.sort;
    });
  }

  pos(_order: Order) {
    this.posService.changeOrder(_order);
    this.router.navigate(['/pos']);
  }
}
