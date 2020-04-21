import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';

import { ServicesModule } from "../services/services.module";
import { SharedModule } from "../shared/shared.module";
import { ProductsRoutingModule } from "./products-routing.module";
import { ProducttableComponent } from "./producttable/producttable.component";

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatTableModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    ServicesModule,
    SharedModule,
  ],
  declarations: [ProducttableComponent],
  entryComponents: []
})
export class ProductsModule {}
