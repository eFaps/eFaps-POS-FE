import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { BalanceDocumentListComponent } from './balance-document-list/balance-document-list.component';
import { BalanceListComponent } from './balance-list/balance-list.component';
import { BalancePaymentListComponent } from './balance-payment-list/balance-payment-list.component';
import { BalanceSummarySectionComponent } from './balance-summary-section/balance-summary-section.component';
import { BalanceSummaryComponent } from './balance-summary/balance-summary.component';
import { BalanceComponent } from './balance/balance.component';
import { DocumentDialogComponent } from './document-dialog/document-dialog.component';
import { DocumentListComponent } from './document-list/document-list.component';
import { BalanceSummaryDialogComponent } from './balance-summary-dialog/balance-summary-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ],
  declarations: [
    BalanceComponent,
    BalanceDocumentListComponent,
    BalancePaymentListComponent,
    DocumentDialogComponent,
    BalanceSummaryComponent,
    BalanceSummarySectionComponent,
    BalanceListComponent,
    DocumentListComponent,
    BalanceSummaryDialogComponent
  ],
  entryComponents: [
    DocumentDialogComponent,
    BalanceSummaryComponent,
    BalanceSummaryDialogComponent
  ]
})
export class BalanceModule { }
