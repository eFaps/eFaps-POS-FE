import { Routes } from "@angular/router";
import {
  authGuard,
  Permission,
  permissionGuard,
  workspaceGuard,
} from "@efaps/pos-library";

export const routes: Routes = [
  {
    path: "admin",
    canActivate: [authGuard, permissionGuard],
    data: { permissions: [Permission.ADMIN] },
    loadChildren: () => import("./admin/admin.routes").then((m) => m.routes),
  },
  {
    path: "balance",
    canActivate: [authGuard, workspaceGuard],
    loadChildren: () =>
      import("./balance/balance.routes").then((m) => m.routes),
  },
  {
    path: "contacts",
    canActivate: [authGuard, workspaceGuard],
    loadChildren: () =>
      import("./contacts/contacts.routes").then((m) => m.routes),
  },
  {
    path: "inventory",
    canActivate: [authGuard, workspaceGuard],
    loadChildren: () =>
      import("./inventory/inventory.routes").then((m) => m.routes),
  },
  {
    path: "login",
    loadChildren: () => import("./login/login.routes").then((m) => m.routes),
  },
  {
    path: "orders",
    canActivate: [authGuard, workspaceGuard],
    loadChildren: () => import("./orders/orders.routes").then((m) => m.routes),
  },
  {
    path: "payment",
    canActivate: [authGuard, permissionGuard],
    data: { permissions: [Permission.COLLECT] },
    loadChildren: () =>
      import("./payment/payment.routes").then((m) => m.routes),
  },
  {
    path: "pos",
    canActivate: [authGuard, workspaceGuard, permissionGuard],
    data: { permissions: [Permission.ORDER] },
    loadChildren: () => import("./pos/pos.routes").then((m) => m.routes),
  },
  {
    path: "products",
    canActivate: [authGuard, workspaceGuard],
    loadChildren: () =>
      import("./products/products.routes").then((m) => m.routes),
  },
  {
    path: "spots",
    canActivate: [authGuard, workspaceGuard],
    loadChildren: () => import("./spots/spots.routes").then((m) => m.routes),
  },
  {
    path: "workspaces",
    canActivate: [authGuard],
    loadChildren: () =>
      import("./workspace/workspace.routes").then((m) => m.routes),
  },
  {
    path: "credit-notes",
    canActivate: [authGuard, workspaceGuard],
    loadChildren: () =>
      import("./credit-notes/credit-notes.routes").then((m) => m.routes),
  },
  {
    path: "stocktaking",
    canActivate: [authGuard, workspaceGuard],
    loadChildren: () =>
      import("./stocktaking/stocktaking.routes").then((m) => m.routes),
  },
  {
    path: "remote",
    canActivate: [authGuard, workspaceGuard],
    loadComponent: () =>
      import("./remote/remote.component").then((m) => m.RemoteComponent),
  },
  { path: "**", redirectTo: "pos" },
];
