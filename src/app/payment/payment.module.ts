import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';

import { PaymentComponent } from './payment.component';
import { CashComponent } from './cash/cash.component';
import { DocumentComponent } from './document/document.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    CashComponent,
    DocumentComponent,
    PaymentComponent
  ]
})
export class PaymentModule { }
