import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCreditNoteComponent } from './create-credit-note/create-credit-note.component';

const routes: Routes = [{ path: "", component: CreateCreditNoteComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditNotesRoutingModule { }
