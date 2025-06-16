import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


const routes: Routes = [{ path: "", loadComponent: () => import('./create-credit-note/create-credit-note.component').then(m => m.CreateCreditNoteComponent) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreditNotesRoutingModule {}
