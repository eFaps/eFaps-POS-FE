import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin/admin.component';
import { NgBusyModule } from 'ng-busy';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    SharedModule,
    NgBusyModule,
    AdminRoutingModule,
  ],
  declarations: [AdminComponent]
})
export class AdminModule { }
