import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";

import { InventoryRoutingModule } from "./inventory-routing.module";
import { InventoryTableComponent } from "./inventory-table/inventory-table.component";
import { InventoryComponent } from "./inventory/inventory.component";

@NgModule({
  imports: [
    CommonModule,
    InventoryRoutingModule,
    MatFormFieldModule,
    MatTableModule,
    MatTabsModule
  ],
  declarations: [InventoryComponent, InventoryTableComponent]
})
export class InventoryModule {}
