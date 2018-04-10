import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../material/material.module';

import { PaymentComponent } from './payment.component';
import { CashComponent } from './cash/cash.component';
import { DocumentComponent } from './document/document.component';

import { SharedModule } from '../shared/shared.module';
import { FreeComponent } from './free/free.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule
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
