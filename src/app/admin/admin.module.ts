import { AdminComponent } from './admin/admin.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [AdminComponent]
})
export class AdminModule { }
