import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { AdminGuard, AuthGuard, WorkspaceGuard } from './guards/index';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material/material.module';
import { OrdersModule } from './orders/orders.module';
import { ConfirmDialogComponent } from './payment/confirm-dialog/confirm-dialog.component';
import { PaymentModule } from './payment/payment.module';
import { CommandsComponent } from './pos/commands/commands.component';
import { OrderDialogComponent } from './pos/order-dialog/order-dialog.component';
import { PosComponent } from './pos/pos.component';
import { PosModule } from './pos/pos.module';
import { ProductgridComponent } from './pos/productgrid/productgrid.component';
import { TicketComponent } from './pos/ticket/ticket.component';
import { TotalsComponent } from './pos/totals/totals.component';
import { ProducttableComponent } from './producttable/producttable.component';
import {
  AuthService,
  ConfigService,
  DocumentService,
  ErrorInterceptor,
  ImageService,
  JwtInterceptor,
  PaymentService,
  PosService,
  PosCurrencyPipe,
  ProductService,
  UserService,
  UtilsService,
  WorkspaceService
} from './services/index';
import { SameHeightDirective } from './services/same-height.directive';
import { SecurePipe } from './services/secure.pipe';
import { VirtKeyboardDirective } from './services/virt-keyboard.directive';
import { SharedModule } from './shared/shared.module';
import { WorkspaceComponent } from './workspace/workspace.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}


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
    CommandsComponent,
    OrderDialogComponent,
    SameHeightDirective,
    PosCurrencyPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    routes,
    AdminModule,
    PaymentModule,
    OrdersModule,
    SharedModule,
    PosModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    AdminGuard,
    AuthGuard,
    WorkspaceGuard,
    AuthService,
    DocumentService,
    PaymentService,
    ProductService,
    PosService,
    UtilsService,
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  entryComponents: [
      ConfirmDialogComponent,
      OrderDialogComponent
  ],
  bootstrap: [
      AppComponent
  ]
})
export class AppModule { }
