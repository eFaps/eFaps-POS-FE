import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {
  authGuard,
  workspaceGuard,
  Permission,
  permissionGuard,
} from "@efaps/pos-library";

const routes: Routes = [
  {
    path: "admin",
    canActivate: [authGuard, permissionGuard],
    data: { permissions: [Permission.ADMIN] },
    loadChildren: () =>
      import("./admin/admin.module").then((m) => m.AdminModule),
  },
  {
    path: "balance",
    canActivate: [authGuard],
    loadChildren: () =>
      import("./balance/balance.module").then((m) => m.BalanceModule),
  },
  {
    path: "contacts",
    canActivate: [authGuard],
    loadChildren: () =>
      import("./contacts/contacts.module").then((m) => m.ContactsModule),
  },
  {
    path: "inventory",
    canActivate: [authGuard],
    loadChildren: () =>
      import("./inventory/inventory.module").then((m) => m.InventoryModule),
  },
  {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then((m) => m.LoginModule),
  },
  {
    path: "orders",
    canActivate: [authGuard],
    loadChildren: () =>
      import("./orders/orders.module").then((m) => m.OrdersModule),
  },
  {
    path: "payment",
    canActivate: [authGuard, permissionGuard],
    data: { permissions: [Permission.COLLECT] },
    loadChildren: () =>
      import("./payment/payment.module").then((m) => m.PaymentModule),
  },
  {
    path: "pos",
    canActivate: [authGuard, workspaceGuard, permissionGuard],
    data: { permissions: [Permission.ORDER] },
    loadChildren: () => import("./pos/pos.module").then((m) => m.PosModule),
  },
  {
    path: "products",
    canActivate: [authGuard, workspaceGuard],
    loadChildren: () =>
      import("./products/products.module").then((m) => m.ProductsModule),
  },
  {
    path: "spots",
    canActivate: [authGuard],
    loadChildren: () =>
      import("./spots/spots.module").then((m) => m.SpotsModule),
  },
  {
    path: "workspaces",
    canActivate: [authGuard],
    loadChildren: () =>
      import("./workspace/workspace.module").then((m) => m.WorkspaceModule),
  },
  {
    path: "credit-notes",
    canActivate: [authGuard],
    loadChildren: () =>
      import("./credit-notes/credit-notes.module").then(
        (m) => m.CreditNotesModule
      ),
  },
  {
    path: "stocktaking",
    canActivate: [authGuard],
    loadChildren: () =>
      import("./stocktaking/stocktaking.module").then(
        (m) => m.StocktakingModule
      ),
  },
  { path: "**", redirectTo: "pos" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
