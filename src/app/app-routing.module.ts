import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, WorkspaceGuard, AdminGuard } from '@efaps/pos-library';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module')
        .then(
          m => m.LoginModule
        )
  },
  {
    path: 'pos', canActivate: [AuthGuard, WorkspaceGuard],
    loadChildren: () =>
      import('./pos/pos.module')
        .then(
          m => m.PosModule
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


  {
    path: 'admin', canActivate: [AuthGuard, AdminGuard],
    loadChildren: () =>
      import('./admin/admin.module')
        .then(
          m => m.AdminModule
        )
  },
  { path: '**', redirectTo: 'pos' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
