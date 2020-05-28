import { Component, OnInit } from "@angular/core";
import { InventoryService, Warehouse } from "@efaps/pos-library";

@Component({
  selector: "app-inventory",
  templateUrl: "./inventory.component.html",
  styleUrls: ["./inventory.component.scss"],
})
export class InventoryComponent implements OnInit {
  warehouses: Warehouse[] = [];

  constructor(private inventoryService: InventoryService) {}

  ngOnInit() {
    this.inventoryService.getWarehouses().subscribe((_warehouses) => {
      if (_warehouses) {
        _warehouses.forEach((_warehouse) => this.warehouses.push(_warehouse));
      }
    });
  }
}
