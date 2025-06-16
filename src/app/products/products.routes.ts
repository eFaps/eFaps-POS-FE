import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./producttable/producttable.component").then(
        (m) => m.ProducttableComponent,
      ),
  },
];
