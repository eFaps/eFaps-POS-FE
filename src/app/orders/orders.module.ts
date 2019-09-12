import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { OrderTableComponent } from './order-table/order-table.component';
import { ReassignDialogComponent } from './reassign-dialog/reassign-dialog.component';
import { SplitOrderDialogComponent } from './split-order-dialog/split-order-dialog.component';
import { ReassignItemComponent } from './reassign-item/reassign-item.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    OrderTableComponent,
    ReassignDialogComponent,
    SplitOrderDialogComponent,
    ReassignItemComponent,
  ],
  entryComponents: [
    ReassignDialogComponent,
    SplitOrderDialogComponent,
  ],
})
export class OrdersModule { }
