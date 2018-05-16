import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgBusyModule } from 'ng-busy';

import { MaterialModule } from '../material/material.module';
import { PosCurrencyPipe } from '../services/index';
import { ContactComponent } from './contact/contact.component';
import { DocumentComponent } from './document/document.component';
import { KeypadComponent } from './keypad/keypad.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

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
    TranslateModule
  ],
  declarations: [
    DocumentComponent,
    KeypadComponent,
    PosCurrencyPipe,
    ContactComponent,
    ConfirmDialogComponent
  ],
  exports: [
    ConfirmDialogComponent,
    ContactComponent,
    DocumentComponent,
    KeypadComponent,
    NgBusyModule,
    PosCurrencyPipe,
    TranslateModule
  ],
  entryComponents: [
    ConfirmDialogComponent 
  ]
})
export class SharedModule { }
