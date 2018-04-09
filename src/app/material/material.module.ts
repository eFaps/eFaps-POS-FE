import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatDialogModule,
  MatDividerModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
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
    MatDividerModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
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
    MatDividerModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatTableModule,
    MatToolbarModule,
    MatKeyboardModule
  ]
})
export class MaterialModule { }
