import { LazyElementsModule } from "@angular-extensions/elements";
import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
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
    MatButtonModule
  ],
  declarations: [AdminComponent]
})
export class AdminModule {}
