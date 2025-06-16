import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./balance/balance.component").then((m) => m.BalanceComponent),
  },
];
