import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./create-credit-note/create-credit-note.component").then(
        (m) => m.CreateCreditNoteComponent,
      ),
  },
];
