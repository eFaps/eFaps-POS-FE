import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CreditNotesRoutingModule } from "./credit-notes-routing.module";
import { CreateCreditNoteComponent } from "./create-credit-note/create-credit-note.component";
import { SharedModule } from "../shared/shared.module";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [CreateCreditNoteComponent],
  imports: [
    CommonModule,
    CreditNotesRoutingModule,
    SharedModule,
    MatButtonModule,
  ],
})
export class CreditNotesModule {}
