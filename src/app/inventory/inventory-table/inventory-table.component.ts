import { Component, OnInit, ViewChild, inject, input } from "@angular/core";
import { MatSort, MatSortHeader } from "@angular/material/sort";
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from "@angular/material/table";
import {
  InventoryEntry,
  InventoryService,
  Warehouse,
} from "@efaps/pos-library";
import { MatFormField } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";

@Component({
    selector: "app-inventory-table",
    templateUrl: "./inventory-table.component.html",
    styleUrls: ["./inventory-table.component.scss"],
    imports: [
        MatFormField,
        MatInput,
        MatTable,
        MatSort,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        MatSortHeader,
        MatCellDef,
        MatCell,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
    ],
})
export class InventoryTableComponent implements OnInit {
  private inventoryService = inject(InventoryService);

  displayedColumns = ["quantity", "sku", "description"];
  dataSource = new MatTableDataSource<InventoryEntry>();
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  readonly warehouse = input.required<Warehouse>();

  ngOnInit() {
    const warehouse = this.warehouse();
    if (warehouse) {
      this.inventoryService
        .getInventory(warehouse.oid)
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
