import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';

import { SharedModule } from "../shared/shared.module";
import { CategorySelectComponent } from "./category-select/category-select.component";
import { CommandsComponent } from "./commands/commands.component";
import { OrderDialogComponent } from "./order-dialog/order-dialog.component";
import { PosRoutingModule } from "./pos-routing.module";
import { PosComponent } from "./pos.component";
import { ProductGridComponent } from "./product-grid/product-grid.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { RemarkDialogComponent } from "./remark-dialog/remark-dialog.component";
import { TicketComponent } from "./ticket/ticket.component";
import { TotalsComponent } from "./totals/totals.component";

@NgModule({
  imports: [
    CommonModule,
    MatBadgeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatTabsModule,
    PosRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [
    CommandsComponent,
    OrderDialogComponent,
    PosComponent,
    ProductListComponent,
    ProductGridComponent,
    TicketComponent,
    TotalsComponent,
    CategorySelectComponent,
    RemarkDialogComponent
  ],
  entryComponents: [
    OrderDialogComponent,
    CategorySelectComponent,
    RemarkDialogComponent
  ]
})
export class PosModule {}
