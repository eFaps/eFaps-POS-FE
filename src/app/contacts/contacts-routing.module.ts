import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ContactTableComponent } from "./contact-table/contact-table.component";

const routes: Routes = [{ path: "", component: ContactTableComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactsRoutingModule {}
