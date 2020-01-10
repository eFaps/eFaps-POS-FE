import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { ServicesModule } from '../services/services.module';
import { SharedModule } from '../shared/shared.module';
import { ProductComponent } from './product/product.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProducttableComponent } from './producttable/producttable.component';

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    ServicesModule,
    SharedModule
  ],
  declarations: [
    ProducttableComponent,
    ProductComponent
  ],
  entryComponents: [
    ProductComponent
  ]
})
export class ProductsModule { }
