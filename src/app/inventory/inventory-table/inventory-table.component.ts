import { Component, Input, OnInit, ViewChild, inject } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import {
  InventoryEntry,
  InventoryService,
  Warehouse,
} from "@efaps/pos-library";

@Component({
  selector: "app-inventory-table",
  templateUrl: "./inventory-table.component.html",
  styleUrls: ["./inventory-table.component.scss"],
  standalone: false,
})
export class InventoryTableComponent implements OnInit {
  private inventoryService = inject(InventoryService);

  displayedColumns = ["quantity", "sku", "description"];
  dataSource = new MatTableDataSource<InventoryEntry>();
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @Input() warehouse!: Warehouse;

  ngOnInit() {
    if (this.warehouse) {
      this.inventoryService
        .getInventory(this.warehouse.oid)
        .subscribe((data) => {
          this.dataSource.data = data;
          this.dataSource.sort = this.sort;
          this.dataSource.filterPredicate = this.filterPredicate;
          this.dataSource.sortingDataAccessor = this.sortingDataAccessor;
        });
    }
  }

  sortingDataAccessor(_entry: InventoryEntry, _sortHeaderId: string) {
    switch (_sortHeaderId) {
      case "quantity":
        return _entry.quantity;
      case "sku":
        return _entry.product.sku;
      case "description":
        return _entry.product.description;
      default:
    }
    return "";
  }

  filterPredicate(_entry: InventoryEntry, _filter: string) {
    const dataStr =
      _entry.quantity +
      " " +
      _entry.product.sku.toLowerCase() +
      " " +
      _entry.product.description.toLowerCase();
    return dataStr.indexOf(_filter) !== -1;
  }

  applyFilter(event: KeyboardEvent) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
