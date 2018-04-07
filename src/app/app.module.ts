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
    DocumentService,
    ImageService,
    JwtInterceptor,
    PosService,
    ProductService,
    UserService,
    WorkspaceService } from './services/index';
import { AuthGuard, WorkspaceGuard } from './guards/index';
import { routes } from './app.routes';
import { PosComponent } from './pos/pos.component';
import { ProductgridComponent } from './pos/productgrid/productgrid.component';
import { TicketComponent } from './pos/ticket/ticket.component';
import { SecurePipe } from './services/secure.pipe';
import { VirtKeyboardDirective } from './services/virt-keyboard.directive';
import { WorkspaceComponent } from './workspace/workspace.component';
import { TotalsComponent } from './pos/totals/totals.component';
import { CommandsComponent } from './pos/commands/commands.component';

@NgModule({
  declarations: [
    AppComponent,
    ProducttableComponent,
    LoginComponent,
    PosComponent,
    ProductgridComponent,
    TicketComponent,
    SecurePipe,
    VirtKeyboardDirective,
    WorkspaceComponent,
    TotalsComponent,
    CommandsComponent
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
    WorkspaceGuard,
    AuthService,
    DocumentService,
    ProductService,
    PosService,
    UserService,
    ImageService,
    ConfigService,
    WorkspaceService,
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
