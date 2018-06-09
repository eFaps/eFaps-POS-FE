import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ProducttableComponent } from './producttable/producttable.component';
import { ProductComponent } from './product/product.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
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
