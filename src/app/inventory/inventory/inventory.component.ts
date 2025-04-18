import { Component, OnInit, inject } from "@angular/core";
import { InventoryService, Warehouse } from "@efaps/pos-library";

@Component({
  selector: "app-inventory",
  templateUrl: "./inventory.component.html",
  styleUrls: ["./inventory.component.scss"],
  standalone: false,
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
