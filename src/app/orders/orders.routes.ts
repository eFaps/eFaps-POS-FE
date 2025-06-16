import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./order-table/order-table.component").then(
        (m) => m.OrderTableComponent,
      ),
  },
];
