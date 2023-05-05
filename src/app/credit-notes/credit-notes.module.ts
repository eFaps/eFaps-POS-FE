import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CreditNotesRoutingModule } from "./credit-notes-routing.module";
import { CreateCreditNoteComponent } from "./create-credit-note/create-credit-note.component";
import { SharedModule } from "../shared/shared.module";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { MatLegacyListModule as MatListModule } from "@angular/material/legacy-list";
import { MatIconModule } from "@angular/material/icon";
import { AddPaymentDialogComponent } from "./add-payment-dialog/add-payment-dialog.component";
import { MatLegacyFormFieldModule as MatFormFieldModule } from "@angular/material/legacy-form-field";
import { MatLegacyInputModule as MatInputModule } from "@angular/material/legacy-input";
import { ReactiveFormsModule } from "@angular/forms";
import { MatLegacySelectModule as MatSelectModule } from "@angular/material/legacy-select";
import { MatLegacyOptionModule as MatOptionModule } from "@angular/material/legacy-core";
import { MatLegacyDialogModule as MatDialogModule } from "@angular/material/legacy-dialog";
import { SuccessDialogComponent } from "./success-dialog/success-dialog.component";

@NgModule({
  declarations: [
    CreateCreditNoteComponent,
    AddPaymentDialogComponent,
    SuccessDialogComponent,
  ],
  imports: [
    CommonModule,
    CreditNotesRoutingModule,
    SharedModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogModule,
  ],
})
export class CreditNotesModule {}
