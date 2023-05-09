import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatTabsModule } from "@angular/material/tabs";

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
