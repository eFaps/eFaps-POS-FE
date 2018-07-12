import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { BalanceDocumentListComponent } from './balance-document-list/balance-document-list.component';
import { BalanceComponent } from './balance/balance.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule
  ],
  declarations: [
    BalanceComponent,
    BalanceDocumentListComponent
  ]
})
export class BalanceModule { }
