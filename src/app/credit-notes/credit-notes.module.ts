import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreditNotesRoutingModule } from './credit-notes-routing.module';
import { CreateCreditNoteComponent } from './create-credit-note/create-credit-note.component';


@NgModule({
  declarations: [
    CreateCreditNoteComponent
  ],
  imports: [
    CommonModule,
    CreditNotesRoutingModule
  ]
})
export class CreditNotesModule { }
