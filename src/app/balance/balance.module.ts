import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { BalanceDocumentListComponent } from './balance-document-list/balance-document-list.component';
import { BalanceComponent } from './balance/balance.component';
import { BalancePaymentListComponent } from './balance-payment-list/balance-payment-list.component';
import { DocumentDialogComponent } from './document-dialog/document-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule
  ],
  declarations: [
    BalanceComponent,
    BalanceDocumentListComponent,
    BalancePaymentListComponent,
    DocumentDialogComponent
  ],
  entryComponents: [
    DocumentDialogComponent
  ]
})
export class BalanceModule { }