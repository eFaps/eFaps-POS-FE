import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatLegacyDialogModule as MatDialogModule } from "@angular/material/legacy-dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatLegacyFormFieldModule as MatFormFieldModule } from "@angular/material/legacy-form-field";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatLegacyInputModule as MatInputModule } from "@angular/material/legacy-input";
import { MatLegacyListModule as MatListModule } from "@angular/material/legacy-list";
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from "@angular/material/legacy-progress-spinner";
import { MatLegacyRadioModule as MatRadioModule } from "@angular/material/legacy-radio";
import { MatLegacyTabsModule as MatTabsModule } from "@angular/material/legacy-tabs";

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
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatInputModule,
    MatListModule,
    MatRadioModule,
    MatTabsModule,
    PaymentRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MatProgressSpinnerModule,
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
})
export class PaymentModule {}
