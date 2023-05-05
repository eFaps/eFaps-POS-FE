import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { StocktakingRoutingModule } from "./stocktaking-routing.module";
import { StocktakingComponent } from "./stocktaking/stocktaking.component";
import { MatLegacyFormFieldModule as MatFormFieldModule } from "@angular/material/legacy-form-field";
import { MatLegacyInputModule as MatInputModule } from "@angular/material/legacy-input";
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from "@angular/material/legacy-autocomplete";
import { ReactiveFormsModule } from "@angular/forms";
import { MatLegacyOptionModule as MatOptionModule } from "@angular/material/legacy-core";
import { MatIconModule } from "@angular/material/icon";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { SharedModule } from "../shared/shared.module";
import { StocktakingInitComponent } from "./stocktaking-init/stocktaking-init.component";
import { StocktakingTableComponent } from "./stocktaking-table/stocktaking-table.component";
import { MatLegacySelectModule as MatSelectModule } from "@angular/material/legacy-select";
import { MatLegacyTableModule as MatTableModule } from "@angular/material/legacy-table";
import { CreateStocktakingDialogComponent } from "./create-stocktaking-dialog/create-stocktaking-dialog.component";
import { MatLegacyDialogModule as MatDialogModule } from "@angular/material/legacy-dialog";
import { MatLegacySnackBarModule as MatSnackBarModule } from "@angular/material/legacy-snack-bar";

@NgModule({
  declarations: [
    StocktakingComponent,
    StocktakingInitComponent,
    StocktakingTableComponent,
    CreateStocktakingDialogComponent,
  ],
  imports: [
    CommonModule,
    StocktakingRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    SharedModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
})
export class StocktakingModule {}
