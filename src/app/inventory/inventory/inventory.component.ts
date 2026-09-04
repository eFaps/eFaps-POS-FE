import {
  Component,
  OnInit,
  inject,
  ChangeDetectionStrategy,
} from "@angular/core";
import { MatTab, MatTabContent, MatTabGroup } from "@angular/material/tabs";

import { InventoryTableComponent } from "../inventory-table/inventory-table.component";
import { InventoryService, Warehouse } from "@efaps/pos-library";

@Component({
  selector: "app-inventory",
  templateUrl: "./inventory.component.html",
  styleUrls: ["./inventory.component.scss"],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [MatTabGroup, MatTab, MatTabContent, InventoryTableComponent],
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
