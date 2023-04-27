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

@NgModule({
  declarations: [StocktakingComponent],
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
    SharedModule,
  ],
})
export class StocktakingModule {}
