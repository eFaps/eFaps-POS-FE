import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatTableModule,
    MatSidenavModule,
    MatToolbarModule } from '@angular/material';

@NgModule({
  imports: [
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule
  ],
  exports: [
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule
  ]
})
export class MaterialModule { }
