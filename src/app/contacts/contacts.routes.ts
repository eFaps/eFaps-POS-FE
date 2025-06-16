import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./contact-table/contact-table.component").then(
        (m) => m.ContactTableComponent,
      ),
  },
];
