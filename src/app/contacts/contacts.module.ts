import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";

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
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    ServicesModule,
    SharedModule,
  ],
  declarations: [ContactTableComponent, CreateContactDialogComponent],
})
export class ContactsModule {}
