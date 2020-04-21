import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { AngularSvgIconModule } from "angular-svg-icon";

import { ServicesModule } from "../services/services.module";
import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login.component";

@NgModule({
  declarations: [LoginComponent],
  imports: [
    AngularSvgIconModule,
    CommonModule,
    LoginRoutingModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    ServicesModule
  ]
})
export class LoginModule {}
