import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";



const routes: Routes = [{ path: "", loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
