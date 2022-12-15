import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";

import { ServicesModule } from "../services/services.module";
import { SharedModule } from "../shared/shared.module";
import { ProductsRoutingModule } from "./products-routing.module";
import { ProducttableComponent } from "./producttable/producttable.component";

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSortModule,
    MatTableModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    ServicesModule,
    SharedModule,
  ],
  declarations: [ProducttableComponent],
})
export class ProductsModule {}
