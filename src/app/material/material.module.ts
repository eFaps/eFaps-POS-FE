import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatTabsModule,
    MatTableModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatToolbarModule } from '@angular/material';

import { MatKeyboardModule } from '@ngx-material-keyboard/core';

@NgModule({
  imports: [
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
