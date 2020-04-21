import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';

import { SharedModule } from "../shared/shared.module";
import { AutoComponent } from "./auto/auto.component";
import { CardComponent } from "./card/card.component";
import { CashComponent } from "./cash/cash.component";
import { DiscountComponent } from "./discount/discount.component";
import { FreeComponent } from "./free/free.component";
import { PaymentRoutingModule } from "./payment-routing.module";
import { PaymentTypeComponent } from "./payment-type/payment-type.component";
import { PaymentComponent } from "./payment.component";
import { SuccessDialogComponent } from "./success-dialog/success-dialog.component";

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatGridListModule,
    MatListModule,
    MatTabsModule,
    PaymentRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [
    AutoComponent,
    CardComponent,
    CashComponent,
    DiscountComponent,
    FreeComponent,
    PaymentComponent,
    PaymentTypeComponent,
    SuccessDialogComponent,
  ],
  entryComponents: [
    AutoComponent,
    CardComponent,
    CashComponent,
    DiscountComponent,
    FreeComponent,
    SuccessDialogComponent
  ]
})
export class PaymentModule {}
