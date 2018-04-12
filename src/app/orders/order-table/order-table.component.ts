import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

import { DocumentService, PosService } from '../../services/index';
import { DocStatus, Order } from '../../model/index';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css']
})
export class OrderTableComponent implements OnInit {
  DocStatus = DocStatus;
  displayedColumns = ['number', 'status', 'cmd'];
  dataSource = new MatTableDataSource<Order>();

  constructor(private router: Router,
    private documentService: DocumentService,
    private posService: PosService) { }

  ngOnInit() {
    this.documentService.getOrders().subscribe(_orders => {
      this.dataSource.data = _orders;
    });
  }

  pos(_order: Order) {
    this.posService.changeOrder(_order);
    this.router.navigate(['/pos']);
  }
}
