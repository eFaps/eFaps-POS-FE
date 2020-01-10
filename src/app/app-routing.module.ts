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
    path: 'balance',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./balance/balance.module')
        .then(
          m => m.BalanceModule
        )
  },
  {
    path: 'contacts',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./contacts/contacts.module')
        .then(
          m => m.ContactsModule
        )

  },
  {
    path: 'inventory', canActivate: [AuthGuard],
    loadChildren: () =>
      import('./inventory/inventory.module')
        .then(
          m => m.InventoryModule
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
    path: 'orders',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./orders/orders.module')
        .then(
          m => m.OrdersModule
        )
  },
  {
    path: 'payment',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./payment/payment.module')
        .then(
          m => m.PaymentModule
        )
  },
  {
    path: 'pos',
    canActivate: [AuthGuard, WorkspaceGuard],
    loadChildren: () =>
      import('./pos/pos.module')
        .then(
          m => m.PosModule
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
    path: 'spots', canActivate: [AuthGuard],
    loadChildren: () =>
      import('./spots/spots.module')
        .then(
          m => m.SpotsModule
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
  { path: '**', redirectTo: 'pos' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
