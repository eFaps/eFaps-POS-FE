import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StocktakingComponent } from "./stocktaking/stocktaking.component";

const routes: Routes = [{ path: "", component: StocktakingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StocktakingRoutingModule {}
