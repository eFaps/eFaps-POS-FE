import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatTableModule, MatSidenavModule, MatToolbarModule } from '@angular/material';

@NgModule({
  imports: [
    MatIconModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule
  ],
  exports: [
    MatIconModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule
  ]
})
export class MaterialModule { }
