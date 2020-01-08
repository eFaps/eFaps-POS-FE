import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { ServicesModule } from '../services/services.module';
import { SharedModule } from '../shared/shared.module';
import { ContactTableComponent } from './contact-table/contact-table.component';
import { CreateContactDialogComponent } from './create-contact-dialog/create-contact-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    ServicesModule,
  ],
  declarations: [
    ContactTableComponent,
    CreateContactDialogComponent
  ],
  entryComponents: [
    CreateContactDialogComponent
  ],
})
export class ContactsModule { }
