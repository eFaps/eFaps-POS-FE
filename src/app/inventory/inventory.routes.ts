import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./inventory/inventory.component").then(
        (m) => m.InventoryComponent,
      ),
  },
];
