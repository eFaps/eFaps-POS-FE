import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./admin/admin.component").then((m) => m.AdminComponent),
  },
];
