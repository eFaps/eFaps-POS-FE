import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { StocktakingRoutingModule } from "./stocktaking-routing.module";
import { StocktakingComponent } from "./stocktaking/stocktaking.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { ReactiveFormsModule } from "@angular/forms";
import { MatOptionModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { SharedModule } from "../shared/shared.module";
import { StocktakingInitComponent } from "./stocktaking-init/stocktaking-init.component";
import { StocktakingTableComponent } from "./stocktaking-table/stocktaking-table.component";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { CreateStocktakingDialogComponent } from "./create-stocktaking-dialog/create-stocktaking-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { StocktakingEntryTableComponent } from "./stocktaking-entry-table/stocktaking-entry-table.component";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";

@NgModule({
  declarations: [
    StocktakingComponent,
    StocktakingInitComponent,
    StocktakingTableComponent,
    CreateStocktakingDialogComponent,
    StocktakingEntryTableComponent,
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
    MatPaginatorModule,
    MatSortModule,
  ],
})
export class StocktakingModule {}
