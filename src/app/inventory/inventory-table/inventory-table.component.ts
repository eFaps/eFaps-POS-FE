import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';

import { Warehouse } from '../../model/index';
import { InventoryService } from '../../services/index';

@Component({
  selector: 'app-inventory-table',
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.scss']
})
export class InventoryTableComponent implements OnInit {
  displayedColumns = ['quantity', 'sku', 'description'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  @Input() warehouse: Warehouse;

  constructor(private inventoryService: InventoryService) { }

  ngOnInit() {
    if (this.warehouse) {
      this.inventoryService.getInventory(this.warehouse.oid)
        .subscribe(data => {
          this.dataSource.data = data;
          this.dataSource.sort = this.sort;
        });
    }
  }

  applyFilter(_filterValue: string) {
    _filterValue = _filterValue.trim();
    _filterValue = _filterValue.toLowerCase();
    this.dataSource.filter = _filterValue;
  }
}
