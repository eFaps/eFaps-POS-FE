import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { CommandsComponent } from './commands/commands.component';
import { OrderDialogComponent } from './order-dialog/order-dialog.component';
import { PosComponent } from './pos.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductGridComponent } from './product-grid/product-grid.component';
import { TicketComponent } from './ticket/ticket.component';
import { TotalsComponent } from './totals/totals.component';
import { CategorySelectComponent } from './category-select/category-select.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    CommandsComponent,
    OrderDialogComponent,
    PosComponent,
    ProductListComponent,
    ProductGridComponent,
    TicketComponent,
    TotalsComponent,
    CategorySelectComponent
  ],
  entryComponents: [
    OrderDialogComponent,
    CategorySelectComponent
  ],
})
export class PosModule { }
