import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';

import { ServicesModule } from "../services/services.module";
import { SharedModule } from "../shared/shared.module";
import { ContactTableComponent } from "./contact-table/contact-table.component";
import { ContactsRoutingModule } from "./contacts-routing.module";
import { CreateContactDialogComponent } from "./create-contact-dialog/create-contact-dialog.component";

@NgModule({
  imports: [
    CommonModule,
    ContactsRoutingModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatTableModule,
    ReactiveFormsModule,
    ServicesModule,
    SharedModule,
  ],
  declarations: [ContactTableComponent, CreateContactDialogComponent],
  entryComponents: [CreateContactDialogComponent]
})
export class ContactsModule {}
