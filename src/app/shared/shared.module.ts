import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { MaterialModule } from '../material/material.module';
import { PosCurrencyPipe } from '../services/index';
import { KeypadComponent } from './keypad/keypad.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    TranslateModule
  ],
  declarations: [
    KeypadComponent,
    PosCurrencyPipe
  ],
  exports: [
    KeypadComponent,
    TranslateModule,
    PosCurrencyPipe
  ]
})
export class SharedModule { }
