import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { MatLegacyDialogModule as MatDialogModule } from "@angular/material/legacy-dialog";
import { MatLegacyFormFieldModule as MatFormFieldModule } from "@angular/material/legacy-form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatLegacyInputModule as MatInputModule } from "@angular/material/legacy-input";
import { MatLegacyListModule as MatListModule } from "@angular/material/legacy-list";
import { MatSortModule } from "@angular/material/sort";
import { MatLegacyTableModule as MatTableModule } from "@angular/material/legacy-table";
import { MatLegacyTabsModule as MatTabsModule } from "@angular/material/legacy-tabs";
import { PosLibraryModule } from "@efaps/pos-library";
import { NgBusyModule } from "ng-busy";

import { SharedModule } from "../shared/shared.module";
import { BalanceDocumentListComponent } from "./balance-document-list/balance-document-list.component";
import { BalanceListComponent } from "./balance-list/balance-list.component";
import { BalancePaymentListComponent } from "./balance-payment-list/balance-payment-list.component";
import { BalanceRoutingModule } from "./balance-routing.module";
import { BalanceSummaryDialogComponent } from "./balance-summary-dialog/balance-summary-dialog.component";
import { BalanceSummarySectionComponent } from "./balance-summary-section/balance-summary-section.component";
import { BalanceSummaryComponent } from "./balance-summary/balance-summary.component";
import { BalanceComponent } from "./balance/balance.component";
import { DocumentDialogComponent } from "./document-dialog/document-dialog.component";
import { DocumentListComponent } from "./document-list/document-list.component";
import { OpeningBalanceDialogComponent } from "./opening-balance-dialog/opening-balance-dialog.component";

@NgModule({
  imports: [
    BalanceRoutingModule,
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    NgBusyModule,
    PosLibraryModule,
    ReactiveFormsModule,
    SharedModule,
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
    BalanceSummaryDialogComponent,
    OpeningBalanceDialogComponent,
  ],
})
export class BalanceModule {}
