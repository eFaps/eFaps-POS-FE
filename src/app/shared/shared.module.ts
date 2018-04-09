import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';

import { KeypadComponent } from './keypad/keypad.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    KeypadComponent
  ],
  exports: [
    KeypadComponent
  ]
})
export class SharedModule { }
