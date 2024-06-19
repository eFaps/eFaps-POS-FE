import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { AngularSvgIconModule } from "angular-svg-icon";

import { MatButtonModule } from "@angular/material/button";
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
    MatSnackBarModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    ServicesModule,
  ],
})
export class LoginModule {}
