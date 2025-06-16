import { provideHttpClientTesting } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import {
  PosConfigToken,
  PosCurrencyPipe,
  PrintService,
} from "@efaps/pos-library";
import { MockComponent, MockPipe } from "ng-mocks";

import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { PrintDisplayComponent } from "../../shared/print-display/print-display.component";
import { SuccessDialogComponent } from "./success-dialog.component";

class PrintServiceSub {}

describe("SuccessDialogComponent", () => {
  let component: SuccessDialogComponent;
  let fixture: ComponentFixture<SuccessDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MockPipe(PosCurrencyPipe),
        MockComponent(PrintDisplayComponent),
        SuccessDialogComponent,
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            docType: 0,
            change: 0,
            document: {
              number: 123,
            },
          },
        },
        { provide: PosConfigToken, useValue: {} },
        { provide: PrintService, useClass: PrintServiceSub },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
