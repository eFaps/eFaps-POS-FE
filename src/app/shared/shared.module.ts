import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KeypadComponent } from './keypad/keypad.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    KeypadComponent
  ],
  exports: [
    KeypadComponent
  ]
})
export class SharedModule { }
