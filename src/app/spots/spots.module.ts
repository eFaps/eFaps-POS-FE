import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { BaseSpotPickerComponent } from './base-spot-picker/base-spot-picker.component';
import { ExtendedSpotPickerComponent } from './extended-spot-picker/extended-spot-picker.component';
import { SplitDialogComponent } from './split-dialog/split-dialog.component';
import { SpotDialogComponent } from './spot-dialog/spot-dialog.component';
import { SpotsComponent } from './spots/spots.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    SharedModule
  ],
  declarations: [
    BaseSpotPickerComponent,
    ExtendedSpotPickerComponent,
    SplitDialogComponent,
    SpotDialogComponent,
    SpotsComponent,
  ],
  entryComponents: [
    SplitDialogComponent,
    SpotDialogComponent
  ],
  providers: [

  ]
})
export class SpotsModule { }
