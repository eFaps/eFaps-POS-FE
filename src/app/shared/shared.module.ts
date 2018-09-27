import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatKeyboardModule } from '@ngx-material-keyboard/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgBusyModule } from 'ng-busy';
import { WebStorageModule } from 'ngx-store';

import { MaterialModule } from '../material/material.module';
import { PosCurrencyPipe, SecurePipe, VirtKeyboardDirective } from '../services/index';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ContactComponent } from './contact/contact.component';
import { DocumentComponent } from './document/document.component';
import { ImageComponent } from './image/image.component';
import { KeypadComponent } from './keypad/keypad.component';
import { PrintDialogComponent } from './print-dialog/print-dialog.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    MatKeyboardModule,
    NgBusyModule,
    ReactiveFormsModule,
    TranslateModule,
    WebStorageModule
  ],
  declarations: [
    ConfirmDialogComponent,
    ContactComponent,
    DocumentComponent,
    ImageComponent,
    KeypadComponent,
    PosCurrencyPipe,
    SecurePipe,
    ImageComponent,
    PrintDialogComponent,
    VirtKeyboardDirective,
  ],
  exports: [
    ConfirmDialogComponent,
    ContactComponent,
    DocumentComponent,
    ImageComponent,
    KeypadComponent,
    MatKeyboardModule,
    NgBusyModule,
    PosCurrencyPipe,
    SecurePipe,
    TranslateModule,
    VirtKeyboardDirective,
    WebStorageModule
  ],
  entryComponents: [
    ConfirmDialogComponent,
    ImageComponent,
    PrintDialogComponent
  ]
})
export class SharedModule { }
