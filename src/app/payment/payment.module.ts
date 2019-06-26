import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { AutoComponent } from './auto/auto.component';
import { CardComponent } from './card/card.component';
import { CashComponent } from './cash/cash.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { FreeComponent } from './free/free.component';
import { PaymentTypeContainerComponent } from './payment-type-container/payment-type-container.component';
import { PaymentTypeDirective } from './payment-type.directive';
import { PaymentComponent } from './payment.component';
import { DiscountComponent } from './discount/discount.component';

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
    ConfirmDialogComponent,
    DiscountComponent,
    FreeComponent,
    PaymentComponent,
    PaymentTypeContainerComponent,
    PaymentTypeDirective,
  ],
  entryComponents: [
    AutoComponent,
    CardComponent,
    CashComponent,
    DiscountComponent,
    FreeComponent,
  ]
})
export class PaymentModule { }
