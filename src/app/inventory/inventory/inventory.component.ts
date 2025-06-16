import { Component, OnInit, inject } from "@angular/core";
import { InventoryService, Warehouse } from "@efaps/pos-library";
import { MatTabGroup, MatTab, MatTabContent } from "@angular/material/tabs";
import { InventoryTableComponent } from "../inventory-table/inventory-table.component";

@Component({
    selector: "app-inventory",
    templateUrl: "./inventory.component.html",
    styleUrls: ["./inventory.component.scss"],
    imports: [
        MatTabGroup,
        MatTab,
        MatTabContent,
        InventoryTableComponent,
    ],
})
export class InventoryComponent implements OnInit {
  private inventoryService = inject(InventoryService);

  warehouses: Warehouse[] = [];

  ngOnInit() {
    this.inventoryService.getWarehouses().subscribe((_warehouses) => {
      if (_warehouses) {
        _warehouses.forEach((_warehouse) => this.warehouses.push(_warehouse));
      }
    });
  }
}
