import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { OrderTableComponent } from './order-table/order-table.component';
import { SplitOrderDialogComponent } from './split-order-dialog/split-order-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    SharedModule
  ],
  declarations: [
    OrderTableComponent,
    SplitOrderDialogComponent
  ],
  entryComponents: [
    SplitOrderDialogComponent
  ],
})
export class OrdersModule { }
