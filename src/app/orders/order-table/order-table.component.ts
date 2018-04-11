import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { DocumentService } from '../../services/index';
import { Order } from '../../model/index';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css']
})
export class OrderTableComponent implements OnInit {
  displayedColumns = ['number'];
  dataSource = new MatTableDataSource<Order>();

  constructor(private documentService: DocumentService) { }

  ngOnInit() {
    this.documentService.getOrders().subscribe(_orders => {
      this.dataSource.data = _orders;
    });
  }
}
