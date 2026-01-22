import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideZonelessChangeDetection } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { PosConfigToken, PrintService, UtilsService } from "@efaps/pos-library";
import { MockComponent } from "ng-mocks";
import { beforeEach, describe, expect, it } from "vitest";
import { PrintDisplayComponent } from "../../shared/print-display/print-display.component";
import { SuccessDialogComponent } from "./success-dialog.component";

class PrintServiceSub {}

class UtilsServiceStub {
  getCurrencySymbol() {
    return "S./";
  }
}

describe("SuccessDialogComponent", () => {
  let component: SuccessDialogComponent;
  let fixture: ComponentFixture<SuccessDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MockComponent(PrintDisplayComponent),
        SuccessDialogComponent,
      ],
      providers: [
        provideZonelessChangeDetection(),
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
        { provide: UtilsService, useClass: UtilsServiceStub },
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
