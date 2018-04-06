import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProducttableComponent } from './producttable/producttable.component';
import { MaterialModule } from './material/material.module';
import { AuthService,
    ConfigService,
    ImageService,
    JwtInterceptor,
    PosService,
    ProductService,
    UserService } from './services/index';
import { AuthGuard } from './auth.guard';
import { routes } from './app.routes';
import { PosComponent } from './pos/pos.component';
import { ProductgridComponent } from './pos/productgrid/productgrid.component';
import { TicketComponent } from './pos/ticket/ticket.component';
import { SecurePipe } from './services/secure.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ProducttableComponent,
    LoginComponent,
    PosComponent,
    ProductgridComponent,
    TicketComponent,
    SecurePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MaterialModule,
    routes
  ],
  providers: [
    AuthGuard,
    AuthService,
    ProductService,
    PosService,
    UserService,
    ImageService,
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: (configService: ConfigService) => function() { return configService.load(); },
      deps: [ConfigService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
