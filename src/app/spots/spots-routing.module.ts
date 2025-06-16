import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";



const routes: Routes = [{ path: "", loadComponent: () => import('./spots/spots.component').then(m => m.SpotsComponent) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpotsRoutingModule {}
