import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./payment.component").then((m) => m.PaymentComponent),
  },
];
