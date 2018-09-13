import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { SpotDialogComponent } from './spot-dialog/spot-dialog.component';
import { SpotPickerComponent } from './spot-picker/spot-picker.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    SharedModule
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
