import { LiveAnnouncer } from "@angular/cdk/a11y";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import {
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
  MatLegacyDialogModule as MatDialogModule,
  MatLegacyDialogRef as MatDialogRef,
} from "@angular/material/legacy-dialog";
import { MatLegacyFormFieldModule as MatFormFieldModule } from "@angular/material/legacy-form-field";
import { MatLegacyInputModule as MatInputModule } from "@angular/material/legacy-input";
import { MatLegacySelectModule as MatSelectModule } from "@angular/material/legacy-select";
import { MatLegacySnackBarModule as MatSnackBarModule } from "@angular/material/legacy-snack-bar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  ConfigService,
  PosConfigToken,
  WorkspaceService,
} from "@efaps/pos-library";
import {
  TranslateLoader,
  TranslateModule,
  TranslatePipe,
  TranslateService,
} from "@ngx-translate/core";
import { MockDirective, MockPipe } from "ng-mocks";
import { Observable } from "rxjs";

import { VirtKeyboardDirective } from "../../services";
import {
  SharedModule,
  TranslateLoaderFactory,
} from "../../shared/shared.module";
import { CreateContactDialogComponent } from "./create-contact-dialog.component";

class TranslateServiceStub {
  get() {
    return new Observable((observer) => {
      observer.next("");
    });
  }
}

describe("CreateContactDialogComponent", () => {
  let component: CreateContactDialogComponent;
  let fixture: ComponentFixture<CreateContactDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        SharedModule,
        MatDialogModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: TranslateLoaderFactory,
          },
        }),
      ],
      providers: [
        ConfigService,
        WorkspaceService,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        { provide: LiveAnnouncer, useValue: {} },
        { provide: PosConfigToken, useValue: {} },
        { provide: TranslateService, useClass: TranslateServiceStub },
      ],
      declarations: [
        CreateContactDialogComponent,
        MockDirective(VirtKeyboardDirective),
        MockPipe(TranslatePipe),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateContactDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
