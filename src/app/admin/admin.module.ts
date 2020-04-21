import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { NgBusyModule } from "ng-busy";

import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./admin/admin.component";

@NgModule({
  imports: [CommonModule, AdminRoutingModule, NgBusyModule, TranslateModule],
  declarations: [AdminComponent]
})
export class AdminModule {}
