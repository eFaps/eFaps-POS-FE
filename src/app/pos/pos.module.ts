import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { MaterialModule } from "../material/material.module";
import { SharedModule } from "../shared/shared.module";
import { CategorySelectComponent } from "./category-select/category-select.component";
import { CommandsComponent } from "./commands/commands.component";
import { OrderDialogComponent } from "./order-dialog/order-dialog.component";
import { PosComponent } from "./pos.component";
import { ProductGridComponent } from "./product-grid/product-grid.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { RemarkDialogComponent } from "./remark-dialog/remark-dialog.component";
import { TicketComponent } from "./ticket/ticket.component";
import { TotalsComponent } from "./totals/totals.component";
import { PosRoutingModule } from "./pos-routing.module";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    PosRoutingModule
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
