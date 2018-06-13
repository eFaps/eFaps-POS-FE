import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';

import { InventoryEntry, Warehouse } from '../../model/index';
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
          this.dataSource.filterPredicate = this.filterPredicate;
          this.dataSource.sortingDataAccessor = this.sortingDataAccessor;
        });
    }
  }

  sortingDataAccessor(_entry: InventoryEntry, _sortHeaderId: string) {
    switch (_sortHeaderId) {
      case 'quantity':
        return _entry.quantity;
      case 'sku':
        return _entry.product.sku;
      case 'description':
        return _entry.product.description;
      default:
    }
    return '';
  }

  filterPredicate(_entry: InventoryEntry, _filter: string) {
    const dataStr = _entry.quantity + ' ' + _entry.product.sku.toLowerCase()
      + ' ' + _entry.product.description.toLowerCase();
    return dataStr.indexOf(_filter) !== -1;
  }

  applyFilter(_filterValue: string) {
    _filterValue = _filterValue.trim();
    _filterValue = _filterValue.toLowerCase();
    this.dataSource.filter = _filterValue;
  }
}
