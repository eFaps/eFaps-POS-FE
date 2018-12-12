import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SynerCashModule } from 'synercash';

import { MaterialModule } from '../material/material.module';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    SynerCashModule
  ],
  declarations: [AdminComponent]
})
export class AdminModule { }
