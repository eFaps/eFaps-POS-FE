import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './inventory/inventory.component';
import { MaterialModule } from '../material/material.module';
import { InventoryTableComponent } from './inventory-table/inventory-table.component';
import { InventoryRoutingModule } from './inventory-routing.module';

@NgModule({
  imports: [
    CommonModule,
    InventoryRoutingModule,
    MaterialModule,
  ],
  declarations: [
    InventoryComponent,
    InventoryTableComponent
  ]
})
export class InventoryModule { }
