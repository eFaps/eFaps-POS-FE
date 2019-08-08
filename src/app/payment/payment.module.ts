import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { AutoComponent } from './auto/auto.component';
import { CardComponent } from './card/card.component';
import { CashComponent } from './cash/cash.component';
import { DiscountComponent } from './discount/discount.component';
import { FreeComponent } from './free/free.component';
import { PaymentTypeComponent } from './payment-type/payment-type.component';
import { PaymentComponent } from './payment.component';
import { SuccessDialogComponent } from './success-dialog/success-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
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
export class PaymentModule { }
