import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { CommandsComponent } from './commands/commands.component';
import { OrderDialogComponent } from './order-dialog/order-dialog.component';
import { PosComponent } from './pos.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductgridComponent } from './productgrid/productgrid.component';
import { TicketComponent } from './ticket/ticket.component';
import { TotalsComponent } from './totals/totals.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    SharedModule
  ],
  declarations: [
    CommandsComponent,
    OrderDialogComponent,
    PosComponent,
    ProductListComponent,
    ProductgridComponent,
    TicketComponent,
    TotalsComponent
  ],
  entryComponents: [
    OrderDialogComponent
  ],
})
export class PosModule { }
