import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatTableModule } from "@angular/material/table";
import { MatKeyboardModule } from "@efaps/angular-onscreen-material-keyboard";
import { WebStorageModule } from "@efaps/ngx-store";
import { PosLibraryModule } from "@efaps/pos-library";
import { TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ServicesModule } from "../services/services.module";
import { ConfirmDialogComponent } from "./confirm-dialog/confirm-dialog.component";
import { ContactComponent } from "./contact/contact.component";
import { DNIQueryComponent } from "./dniquery/dniquery.component";
import { DocumentComponent } from "./document/document.component";
import { EmployeeDialogComponent } from "./employee-dialog/employee-dialog.component";
import { ImageComponent } from "./image/image.component";
import { KeypadComponent } from "./keypad/keypad.component";
import { NoteDialogComponent } from "./note-dialog/note-dialog.component";
import { PartListRelationComponent } from "./part-list-relation/part-list-relation.component";
import { PrintDialogComponent } from "./print-dialog/print-dialog.component";
import { PrintDisplayComponent } from "./print-display/print-display.component";
import { ProductComponent } from "./product/product.component";
import { TaxpayerQueryComponent } from "./taxpayer-query/taxpayer-query.component";
import { TaxpayerResultComponent } from "./taxpayer-result/taxpayer-result.component";

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
    DNIQueryComponent,
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
    NoteDialogComponent,
  ],
  exports: [
    ContactComponent,
    DNIQueryComponent,
    DocumentComponent,
    KeypadComponent,
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
