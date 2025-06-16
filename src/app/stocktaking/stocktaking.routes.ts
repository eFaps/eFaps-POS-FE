import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "init",
    loadComponent: () =>
      import("./stocktaking-init/stocktaking-init.component").then(
        (m) => m.StocktakingInitComponent,
      ),
  },
  {
    path: "entries",
    loadComponent: () =>
      import(
        "./stocktaking-entry-table/stocktaking-entry-table.component"
      ).then((m) => m.StocktakingEntryTableComponent),
  },
  {
    path: ":oid",
    loadComponent: () =>
      import("./stocktaking/stocktaking.component").then(
        (m) => m.StocktakingComponent,
      ),
  },
  {
    path: "",
    loadComponent: () =>
      import("./stocktaking-table/stocktaking-table.component").then(
        (m) => m.StocktakingTableComponent,
      ),
  },
];
