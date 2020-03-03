import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MaterialModule } from "../material/material.module";
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
    MaterialModule,
    ReactiveFormsModule,
    ServicesModule,
    SharedModule
  ],
  declarations: [ContactTableComponent, CreateContactDialogComponent],
  entryComponents: [CreateContactDialogComponent]
})
export class ContactsModule {}
