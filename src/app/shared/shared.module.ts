import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { MaterialModule } from '../material/material.module';

import { KeypadComponent } from './keypad/keypad.component';

// AoT requires an exported function for factories
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
    KeypadComponent
  ],
  exports: [
    KeypadComponent,
    TranslateModule
  ]
})
export class SharedModule { }
