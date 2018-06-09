import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatKeyboardModule } from '@ngx-material-keyboard/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgBusyModule } from 'ng-busy';

import { MaterialModule } from '../material/material.module';
import { PosCurrencyPipe, SecurePipe } from '../services/index';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ContactComponent } from './contact/contact.component';
import { DocumentComponent } from './document/document.component';
import { KeypadComponent } from './keypad/keypad.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    NgBusyModule,
    ReactiveFormsModule,
    TranslateModule,
    MatKeyboardModule
  ],
  declarations: [
    ConfirmDialogComponent,
    ContactComponent,
    DocumentComponent,
    KeypadComponent,
    PosCurrencyPipe,
    SecurePipe
  ],
  exports: [
    ConfirmDialogComponent,
    ContactComponent,
    DocumentComponent,
    KeypadComponent,
    MatKeyboardModule,
    NgBusyModule,
    PosCurrencyPipe,
    SecurePipe,
    TranslateModule
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
