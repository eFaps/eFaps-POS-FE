import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AuthGuard, WorkspaceGuard } from './guards/index';
import {
  AuthService,
  ConfigService,
  DocumentService,
  ErrorInterceptor,
  ImageService,
  JwtInterceptor,
  PaymentService,
  PosService,
  ProductService,
  UserService,
  UtilsService,
  WorkspaceService
} from './services/index';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommandsComponent } from './pos/commands/commands.component';
import { ConfirmDialogComponent } from './payment/confirm-dialog/confirm-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material/material.module';
import { OrderDialogComponent } from './pos/order-dialog/order-dialog.component';
import { OrdersModule } from './orders/orders.module';
import { PaymentModule } from './payment/payment.module';
import { PosComponent } from './pos/pos.component';
import { PosModule } from './pos/pos.module';
import { ProductgridComponent } from './pos/productgrid/productgrid.component';
import { ProducttableComponent } from './producttable/producttable.component';
import { SameHeightDirective } from './services/same-height.directive';
import { SecurePipe } from './services/secure.pipe';
import { SharedModule } from './shared/shared.module';
import { TicketComponent } from './pos/ticket/ticket.component';
import { TotalsComponent } from './pos/totals/totals.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { VirtKeyboardDirective } from './services/virt-keyboard.directive';
import { WorkspaceComponent } from './workspace/workspace.component';
import { routes } from './app.routes';

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
    SameHeightDirective
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
