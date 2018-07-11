import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StompRService } from '@stomp/ng2-stompjs';

import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { ContactsModule } from './contacts/contacts.module';
import { InventoryModule } from './inventory/inventory.module';

import { ProductsModule } from './products/products.module';
import { BalanceModule } from './balance/balance.module';
import { AdminGuard, AuthGuard, WorkspaceGuard } from './guards/index';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material/material.module';
import { OrdersModule } from './orders/orders.module';
import { ConfirmDialogComponent } from './payment/confirm-dialog/confirm-dialog.component';
import { PaymentModule } from './payment/payment.module';
import { PosModule } from './pos/pos.module';
import {
  AdminService,
  AuthService,
  ConfigService,
  ContactService,
  DocumentService,
  ErrorInterceptor,
  ImageService,
  JwtInterceptor,
  MsgService,
  PaymentService,
  PosService,
  ProductService,
  UserService,
  UtilsService,
  WorkspaceService
} from './services/index';
import { SameHeightDirective } from './services/same-height.directive';

import { VirtKeyboardDirective } from './services/virt-keyboard.directive';
import { SharedModule } from './shared/shared.module';
import { SpotsModule } from './spots/spots.module';
import { ThemePickerComponent } from './theme-picker/theme-picker.component';
import { WorkspaceComponent } from './workspace/workspace.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VirtKeyboardDirective,
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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [ HttpClient ]
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
    }
  ],
  entryComponents: [
      ConfirmDialogComponent
  ],
  bootstrap: [
      AppComponent
  ]
})
export class AppModule { }
