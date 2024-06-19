import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StocktakingEntryTableComponent } from "./stocktaking-entry-table/stocktaking-entry-table.component";
import { StocktakingInitComponent } from "./stocktaking-init/stocktaking-init.component";
import { StocktakingTableComponent } from "./stocktaking-table/stocktaking-table.component";
import { StocktakingComponent } from "./stocktaking/stocktaking.component";

const routes: Routes = [
  { path: "init", component: StocktakingInitComponent },
  { path: "entries", component: StocktakingEntryTableComponent },
  { path: ":oid", component: StocktakingComponent },
  { path: "", component: StocktakingTableComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StocktakingRoutingModule {}
