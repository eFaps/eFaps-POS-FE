import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { StompRService } from '@stomp/ng2-stompjs';
import { AngularSvgIconModule, SERVER_URL } from 'angular-svg-icon';
import { HotkeyModule } from 'angular2-hotkeys';

import { environment } from '../environments/environment';
import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { BalanceModule } from './balance/balance.module';
import { ContactsModule } from './contacts/contacts.module';
import { AdminGuard, AuthGuard, WorkspaceGuard } from './guards/index';
import { InventoryModule } from './inventory/inventory.module';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material/material.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentModule } from './payment/payment.module';
import { PosModule } from './pos/pos.module';
import { ProductsModule } from './products/products.module';
import {
  AdminService,
  AuthService,
  ConfigService,
  ContactService,
  DocumentService,
  ErrorInterceptor,
  ImageService,
  JwtInterceptor,
  CompanyInterceptor,
  MsgService,
  PaymentService,
  PosService,
  ProductService,
  SameHeightDirective,
  CompanyService,
  UserService,
  UtilsService,
  WorkspaceService
} from './services/index';
import { SharedModule, TranslateLoaderFactory } from './shared/shared.module';
import { SpotsModule } from './spots/spots.module';
import { ThemePickerComponent } from './theme-picker/theme-picker.component';
import { WorkspaceComponent } from './workspace/workspace.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WorkspaceComponent,
    SameHeightDirective,
    ThemePickerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AngularSvgIconModule,
    routes,
    AdminModule,
    BalanceModule,
    ContactsModule,
    InventoryModule,
    PaymentModule,
    OrdersModule,
    SharedModule,
    SpotsModule,
    PosModule,
    ProductsModule,
    HotkeyModule.forRoot({
      cheatSheetDescription: 'Presentar',
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    AdminGuard,
    AuthGuard,
    WorkspaceGuard,
    AdminService,
    AuthService,
    ContactService,
    DocumentService,
    MsgService,
    PaymentService,
    ProductService,
    PosService,
    UtilsService,
    UserService,
    ImageService,
    ConfigService,
    CompanyService,
    StompRService,
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
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CompanyInterceptor,
      multi: true
    },
    {
      provide: SERVER_URL,
      useValue: environment.electron ? __dirname : '',
    },
    // temporal woraround to deactivate the LiveAnnouncer
    {
      provide: LiveAnnouncer,
      useValue: {}
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
