import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { CashComponent } from './cash/cash.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DocumentComponent } from './document/document.component';
import { FreeComponent } from './free/free.component';
import { PaymentComponent } from './payment.component';

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
    CashComponent,
    DocumentComponent,
    PaymentComponent,
    FreeComponent,
    ConfirmDialogComponent
  ]
})
export class PaymentModule { }
