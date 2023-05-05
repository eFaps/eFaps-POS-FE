import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { MatLegacyDialogModule as MatDialogModule } from "@angular/material/legacy-dialog";
import { MatLegacyFormFieldModule as MatFormFieldModule } from "@angular/material/legacy-form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatLegacyInputModule as MatInputModule } from "@angular/material/legacy-input";
import { MatLegacyPaginatorModule as MatPaginatorModule } from "@angular/material/legacy-paginator";
import { MatLegacySlideToggleModule as MatSlideToggleModule } from "@angular/material/legacy-slide-toggle";
import { MatSortModule } from "@angular/material/sort";
import { MatLegacyTableModule as MatTableModule } from "@angular/material/legacy-table";

import { SharedModule } from "../shared/shared.module";
import { OrderTableComponent } from "./order-table/order-table.component";
import { OrdersRoutingModule } from "./orders-routing.module";
import { ReassignDialogComponent } from "./reassign-dialog/reassign-dialog.component";
import { ReassignItemComponent } from "./reassign-item/reassign-item.component";
import { SplitOrderDialogComponent } from "./split-order-dialog/split-order-dialog.component";

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatSortModule,
    MatTableModule,
    OrdersRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [
    OrderTableComponent,
    ReassignDialogComponent,
    SplitOrderDialogComponent,
    ReassignItemComponent,
  ],
})
export class OrdersModule {}
