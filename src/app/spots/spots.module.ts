import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../material/material.module';
import { SpotPickerComponent } from './spot-picker/spot-picker.component';
import { SpotDialogComponent } from './spot-dialog/spot-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [
      SpotPickerComponent,
      SpotDialogComponent
  ],
  entryComponents: [
    SpotDialogComponent
  ],
})
export class SpotsModule { }
