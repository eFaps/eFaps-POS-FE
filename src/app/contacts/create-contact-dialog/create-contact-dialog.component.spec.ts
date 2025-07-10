import { LiveAnnouncer } from "@angular/cdk/a11y";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  ConfigService,
  ContactService,
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

import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { VirtKeyboardDirective } from "../../services";
import { TranslateLoaderFactory } from "../../shared/shared.module";
import { CreateContactDialogComponent } from "./create-contact-dialog.component";

class TranslateServiceStub {
  get() {
    return new Observable((observer) => {
      observer.next("");
    });
  }
}

class ConfigServiceStub {
  getSystemConfig() {
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
        MatDialogModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: TranslateLoaderFactory,
          },
        }),
        CreateContactDialogComponent,
        MockDirective(VirtKeyboardDirective),
        MockPipe(TranslatePipe),
      ],
      providers: [
        ConfigService,
        WorkspaceService,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        { provide: LiveAnnouncer, useValue: {} },
        { provide: PosConfigToken, useValue: {} },
        { provide: TranslateService, useClass: TranslateServiceStub },
        { provide: ConfigService, useClass: ConfigServiceStub },
        { provide: ContactService, useValue: {} },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
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
