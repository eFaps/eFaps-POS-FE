import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./spots/spots.component").then((m) => m.SpotsComponent),
  },
];
