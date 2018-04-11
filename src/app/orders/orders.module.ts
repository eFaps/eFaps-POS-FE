import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { OrderTableComponent } from './order-table/order-table.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule
  ],
  declarations: [OrderTableComponent]
})
export class OrdersModule { }
