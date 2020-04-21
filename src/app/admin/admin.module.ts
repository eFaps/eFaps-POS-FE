import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from "@ngx-translate/core";
import { NgBusyModule } from "ng-busy";

import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./admin/admin.component";

@NgModule({
  imports: [CommonModule, AdminRoutingModule, NgBusyModule, TranslateModule, MatButtonModule],
  declarations: [AdminComponent]
})
export class AdminModule {}
