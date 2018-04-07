import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatDialogModule,
  MatGridListModule,
  MatIconModule,
  MatTabsModule,
  MatTableModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatToolbarModule
} from '@angular/material';

import { MatKeyboardModule } from '@ngx-material-keyboard/core';

@NgModule({
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatTableModule,
    MatToolbarModule,
    MatKeyboardModule
  ],
  exports: [
    MatDialogModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatTableModule,
    MatToolbarModule,
    MatKeyboardModule
  ]
})
export class MaterialModule { }
