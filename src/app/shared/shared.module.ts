import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PosLibraryModule } from "@efaps/pos-library";
import { TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { MatKeyboardModule } from "angular-onscreen-material-keyboard";
import { NgBusyModule } from "ng-busy";
import { WebStorageModule } from "ngx-store";

import { environment } from "../../environments/environment";
import { MaterialModule } from "../material/material.module";
import { TranslateFileLoader } from "../util/translate-file-loader";
import { ConfirmDialogComponent } from "./confirm-dialog/confirm-dialog.component";
import { ContactComponent } from "./contact/contact.component";
import { DocumentComponent } from "./document/document.component";
import { ImageComponent } from "./image/image.component";
import { KeypadComponent } from "./keypad/keypad.component";
import { PrintDialogComponent } from "./print-dialog/print-dialog.component";
import { PrintDisplayComponent } from "./print-display/print-display.component";
import { ProductComponent } from "./product/product.component";
import { TaxpayerQueryComponent } from "./taxpayer-query/taxpayer-query.component";
import { ServicesModule } from "../services/services.module";
import { TaxpayerResultComponent } from './taxpayer-result/taxpayer-result.component';

export function TranslateLoaderFactory(_httpClient: HttpClient) {
  if (environment.electron) {
    return new TranslateFileLoader();
  } else {
    return new TranslateHttpLoader(_httpClient, "./assets/i18n/");
  }
}

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    MatKeyboardModule,
    NgBusyModule,
    ReactiveFormsModule,
    TranslateModule,
    WebStorageModule,
    PosLibraryModule,
    ServicesModule
  ],
  declarations: [
    ConfirmDialogComponent,
    ContactComponent,
    DocumentComponent,
    ImageComponent,
    KeypadComponent,
    PrintDialogComponent,
    PrintDisplayComponent,
    ProductComponent,
    TaxpayerQueryComponent,
    TaxpayerResultComponent
  ],
  exports: [
    ContactComponent,
    DocumentComponent,
    KeypadComponent,
    NgBusyModule,
    PosLibraryModule,
    PrintDisplayComponent,
    TaxpayerQueryComponent,
    TaxpayerResultComponent,
    TranslateModule,
    WebStorageModule
  ],
  entryComponents: [
    ConfirmDialogComponent,
    ImageComponent,
    PrintDialogComponent,
    ProductComponent,
    TaxpayerResultComponent
  ]
})
export class SharedModule {}
