import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatTableModule } from "@angular/material/table";

import { SharedModule } from "../shared/shared.module";
import { OrderTableComponent } from "./order-table/order-table.component";
import { OrdersRoutingModule } from "./orders-routing.module";
import { ReassignDialogComponent } from "./reassign-dialog/reassign-dialog.component";
import { ReassignItemComponent } from "./reassign-item/reassign-item.component";
import { SplitOrderDialogComponent } from "./split-order-dialog/split-order-dialog.component";

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    OrdersRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    OrderTableComponent,
    ReassignDialogComponent,
    SplitOrderDialogComponent,
    ReassignItemComponent
  ],
  entryComponents: [ReassignDialogComponent, SplitOrderDialogComponent]
})
export class OrdersModule {}
