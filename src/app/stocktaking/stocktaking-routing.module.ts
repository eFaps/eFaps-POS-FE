import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StocktakingComponent } from "./stocktaking/stocktaking.component";
import { StocktakingInitComponent } from "./stocktaking-init/stocktaking-init.component";
import { StocktakingTableComponent } from "./stocktaking-table/stocktaking-table.component";

const routes: Routes = [
  { path: "process", component: StocktakingComponent },
  { path: "init", component: StocktakingInitComponent },
  { path: "", component: StocktakingTableComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StocktakingRoutingModule {}
