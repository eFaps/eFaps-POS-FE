import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatOptionModule } from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { SharedModule } from "../shared/shared.module";
import { CloseStocktakingDialogComponent } from "./close-stocktaking-dialog/close-stocktaking-dialog.component";
import { CreateStocktakingDialogComponent } from "./create-stocktaking-dialog/create-stocktaking-dialog.component";
import { StocktakingEntryTableComponent } from "./stocktaking-entry-table/stocktaking-entry-table.component";
import { StocktakingInitComponent } from "./stocktaking-init/stocktaking-init.component";
import { StocktakingRoutingModule } from "./stocktaking-routing.module";
import { StocktakingTableComponent } from "./stocktaking-table/stocktaking-table.component";
import { StocktakingComponent } from "./stocktaking/stocktaking.component";

@NgModule({
  declarations: [
    StocktakingComponent,
    StocktakingInitComponent,
    StocktakingTableComponent,
    CreateStocktakingDialogComponent,
    StocktakingEntryTableComponent,
    CloseStocktakingDialogComponent,
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
    MatSlideToggleModule,
    MatProgressSpinnerModule,
  ],
})
export class StocktakingModule {}
