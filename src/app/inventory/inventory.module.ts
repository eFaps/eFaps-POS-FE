import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatLegacyFormFieldModule as MatFormFieldModule } from "@angular/material/legacy-form-field";
import { MatLegacyInputModule as MatInputModule } from "@angular/material/legacy-input";
import { MatSortModule } from "@angular/material/sort";
import { MatLegacyTableModule as MatTableModule } from "@angular/material/legacy-table";
import { MatLegacyTabsModule as MatTabsModule } from "@angular/material/legacy-tabs";

import { InventoryRoutingModule } from "./inventory-routing.module";
import { InventoryTableComponent } from "./inventory-table/inventory-table.component";
import { InventoryComponent } from "./inventory/inventory.component";

@NgModule({
  imports: [
    CommonModule,
    InventoryRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
  ],
  declarations: [InventoryComponent, InventoryTableComponent],
})
export class InventoryModule {}
