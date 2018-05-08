import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../material/material.module';
import { ContactTableComponent } from './contact-table/contact-table.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [ContactTableComponent]
})
export class ContactsModule { }
