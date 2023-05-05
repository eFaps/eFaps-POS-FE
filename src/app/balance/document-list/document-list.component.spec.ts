import { HttpClientModule } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatLegacyDialogModule as MatDialogModule } from "@angular/material/legacy-dialog";
import { MatLegacyFormFieldModule as MatFormFieldModule } from "@angular/material/legacy-form-field";
import { MatLegacyInputModule as MatInputModule } from "@angular/material/legacy-input";
import { MatLegacyTableModule as MatTableModule } from "@angular/material/legacy-table";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PosConfigToken, PosCurrencyPipe } from "@efaps/pos-library";
import { TranslatePipe } from "@ngx-translate/core";
import { MockPipe } from "ng-mocks";

import { DocumentListComponent } from "./document-list.component";

describe("DocumentListComponent", () => {
  let component: DocumentListComponent;
  let fixture: ComponentFixture<DocumentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MatDialogModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      providers: [{ provide: PosConfigToken, useValue: {} }],
      declarations: [
        DocumentListComponent,
        MockPipe(TranslatePipe),
        MockPipe(PosCurrencyPipe),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
