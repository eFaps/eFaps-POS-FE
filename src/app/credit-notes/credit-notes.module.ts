import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CreditNotesRoutingModule } from "./credit-notes-routing.module";
import { CreateCreditNoteComponent } from "./create-credit-note/create-credit-note.component";
import { SharedModule } from "../shared/shared.module";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { AddPaymentDialogComponent } from './add-payment-dialog/add-payment-dialog.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatOptionModule } from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  declarations: [CreateCreditNoteComponent, AddPaymentDialogComponent],
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
