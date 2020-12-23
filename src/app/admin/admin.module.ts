import { LazyElementsModule } from "@angular-extensions/elements";
import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TranslateModule } from "@ngx-translate/core";
import { NgBusyModule } from "ng-busy";

import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./admin/admin.component";

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    AdminRoutingModule,
    LazyElementsModule,
    NgBusyModule,
    TranslateModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
  ],
  declarations: [AdminComponent],
})
export class AdminModule { }
