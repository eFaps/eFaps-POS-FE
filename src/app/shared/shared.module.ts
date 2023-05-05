import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from "@angular/material/legacy-autocomplete";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { MatLegacyDialogModule as MatDialogModule } from "@angular/material/legacy-dialog";
import { MatLegacyFormFieldModule as MatFormFieldModule } from "@angular/material/legacy-form-field";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatLegacyInputModule as MatInputModule } from "@angular/material/legacy-input";
import { MatLegacyListModule as MatListModule } from "@angular/material/legacy-list";
import { MatLegacyPaginatorModule as MatPaginatorModule } from "@angular/material/legacy-paginator";
import { MatLegacySlideToggleModule as MatSlideToggleModule } from "@angular/material/legacy-slide-toggle";
import { MatLegacyTableModule as MatTableModule } from "@angular/material/legacy-table";
import { WebStorageModule } from "@efaps/ngx-store";
import { PosLibraryModule } from "@efaps/pos-library";
import { TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { MatKeyboardModule } from "@efaps/angular-onscreen-material-keyboard";
import { NgBusyModule } from "ng-busy";

import { ServicesModule } from "../services/services.module";
import { ConfirmDialogComponent } from "./confirm-dialog/confirm-dialog.component";
import { ContactComponent } from "./contact/contact.component";
import { DocumentComponent } from "./document/document.component";
import { ImageComponent } from "./image/image.component";
import { KeypadComponent } from "./keypad/keypad.component";
import { PartListRelationComponent } from "./part-list-relation/part-list-relation.component";
import { PrintDialogComponent } from "./print-dialog/print-dialog.component";
import { PrintDisplayComponent } from "./print-display/print-display.component";
import { ProductComponent } from "./product/product.component";
import { TaxpayerQueryComponent } from "./taxpayer-query/taxpayer-query.component";
import { TaxpayerResultComponent } from "./taxpayer-result/taxpayer-result.component";
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from "@angular/material/legacy-progress-spinner";
import { MatLegacyTooltipModule as MatTooltipModule } from "@angular/material/legacy-tooltip";
import { EmployeeDialogComponent } from "./employee-dialog/employee-dialog.component";
import { MatLegacySelectModule as MatSelectModule } from "@angular/material/legacy-select";

export function TranslateLoaderFactory(_httpClient: HttpClient) {
  return new TranslateHttpLoader(_httpClient, "./assets/i18n/");
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatTooltipModule,
    MatIconModule,
    MatInputModule,
    MatKeyboardModule,
    MatListModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatTableModule,
    NgBusyModule,
    PosLibraryModule,
    ReactiveFormsModule,
    ServicesModule,
    TranslateModule,
    WebStorageModule,
    MatProgressSpinnerModule,
    MatSelectModule,
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
    TaxpayerResultComponent,
    PartListRelationComponent,
    EmployeeDialogComponent,
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
    WebStorageModule,
    PartListRelationComponent,
  ],
})
export class SharedModule {}
