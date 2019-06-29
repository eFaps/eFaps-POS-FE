import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { SpotDialogComponent } from './spot-dialog/spot-dialog.component';
import { ExtendedSpotPickerComponent } from './extended-spot-picker/extended-spot-picker.component';
import { SpotsComponent } from './spots/spots.component';
import { BaseSpotPickerComponent } from './base-spot-picker/base-spot-picker.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    SharedModule
  ],
  declarations: [
    BaseSpotPickerComponent,
    ExtendedSpotPickerComponent,
    SpotDialogComponent,
    SpotsComponent,
  ],
  entryComponents: [
    SpotDialogComponent
  ],
})
export class SpotsModule { }
