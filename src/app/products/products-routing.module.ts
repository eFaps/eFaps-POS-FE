import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ProducttableComponent } from "./producttable/producttable.component";

const routes: Routes = [{ path: "", component: ProducttableComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {}
