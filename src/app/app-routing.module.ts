import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, WorkspaceGuard, AdminGuard } from '@efaps/pos-library';

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AuthGuard, AdminGuard],
    loadChildren: () =>
      import('./admin/admin.module')
        .then(
          m => m.AdminModule
        )
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module')
        .then(
          m => m.LoginModule
        )
  },
  {
    path: 'products',
    canActivate: [AuthGuard, WorkspaceGuard],
    loadChildren: () =>
      import('./products/products.module')
        .then(
          m => m.ProductsModule
        )
  },
  {
    path: 'workspaces', canActivate: [AuthGuard],
    loadChildren: () =>
      import('./workspace/workspace.module')
        .then(
          m => m.WorkspaceModule
        )
  },
  { path: '**', redirectTo: 'products' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
