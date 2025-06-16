import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatOptionModule } from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatSelectModule } from "@angular/material/select";

import { AddPaymentDialogComponent } from "./add-payment-dialog/add-payment-dialog.component";
import { CreateCreditNoteComponent } from "./create-credit-note/create-credit-note.component";
import { CreditNotesRoutingModule } from "./credit-notes-routing.module";
import { SuccessDialogComponent } from "./success-dialog/success-dialog.component";

@NgModule({
    imports: [
    CommonModule,
    CreditNotesRoutingModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogModule,
    CreateCreditNoteComponent,
    AddPaymentDialogComponent,
    SuccessDialogComponent,
],
})
export class CreditNotesModule {}
