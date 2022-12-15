import { DragDropModule } from "@angular/cdk/drag-drop";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";

import { SharedModule } from "../shared/shared.module";
import { BaseSpotPickerComponent } from "./base-spot-picker/base-spot-picker.component";
import { ExtendedSpotPickerComponent } from "./extended-spot-picker/extended-spot-picker.component";
import { SelectOrderDialogComponent } from "./select-order-dialog/select-order-dialog.component";
import { SplitDialogComponent } from "./split-dialog/split-dialog.component";
import { SpotDialogComponent } from "./spot-dialog/spot-dialog.component";
import { SpotsRoutingModule } from "./spots-routing.module";
import { SpotsComponent } from "./spots/spots.component";

@NgModule({
  imports: [
    CommonModule,
    DragDropModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTabsModule,
    MatTooltipModule,
    ReactiveFormsModule,
    SharedModule,
    SpotsRoutingModule,
  ],
  declarations: [
    BaseSpotPickerComponent,
    ExtendedSpotPickerComponent,
    SelectOrderDialogComponent,
    SplitDialogComponent,
    SpotDialogComponent,
    SpotsComponent,
  ],
  providers: [],
})
export class SpotsModule {}
