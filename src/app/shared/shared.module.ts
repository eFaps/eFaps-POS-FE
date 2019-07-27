import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatKeyboardModule } from '@ngx-material-keyboard/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgBusyModule } from 'ng-busy';
import { WebStorageModule } from 'ngx-store';

import { environment } from '../../environments/environment';
import { MaterialModule } from '../material/material.module';
import { PosCurrencyPipe, SecurePipe, VirtKeyboardDirective } from '../services/index';
import { TranslateFileLoader } from '../util/translate-file-loader';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ContactComponent } from './contact/contact.component';
import { DocumentComponent } from './document/document.component';
import { ImageComponent } from './image/image.component';
import { KeypadComponent } from './keypad/keypad.component';
import { PrintDialogComponent } from './print-dialog/print-dialog.component';
import { PrintDisplayComponent } from './print-display/print-display.component';

export function TranslateLoaderFactory(_httpClient: HttpClient) {
  if (environment.electron) {
    return new TranslateFileLoader();
  } else {
    return new TranslateHttpLoader(_httpClient);
  }
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
    WebStorageModule,
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
    PrintDisplayComponent,
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
    WebStorageModule,
    PrintDisplayComponent
  ],
  entryComponents: [
    ConfirmDialogComponent,
    ImageComponent,
    PrintDialogComponent
  ]
})
export class SharedModule { }
