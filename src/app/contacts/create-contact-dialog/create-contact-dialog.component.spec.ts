import { LiveAnnouncer } from "@angular/cdk/a11y";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  ConfigService,
  PosConfigToken,
  WorkspaceService
} from "@efaps/pos-library";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { MockDirective } from "ng-mocks";

import { VirtKeyboardDirective } from "../../services";
import {
  SharedModule,
  TranslateLoaderFactory
} from "../../shared/shared.module";
import { CreateContactDialogComponent } from "./create-contact-dialog.component";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";

describe("CreateContactDialogComponent", () => {
  let component: CreateContactDialogComponent;
  let fixture: ComponentFixture<CreateContactDialogComponent>;

  beforeEach(async(() => {
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
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: TranslateLoaderFactory,
            deps: [HttpClient]
          }
        })
      ],
      providers: [
        ConfigService,
        WorkspaceService,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        { provide: LiveAnnouncer, useValue: {} },
        { provide: PosConfigToken, useValue: {} }
      ],
      declarations: [
        CreateContactDialogComponent,
        MockDirective(VirtKeyboardDirective)
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateContactDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
