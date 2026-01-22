import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { provideZonelessChangeDetection } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DocumentService, PosConfigToken } from "@efaps/pos-library";
import { TranslateService } from "@ngx-translate/core";
import { beforeEach, describe, expect, it } from "vitest";
import { DocumentDialogComponent } from "./document-dialog.component";

class DocumentServiceStub {}

describe("DocumentDialogComponent", () => {
  let component: DocumentDialogComponent;
  let fixture: ComponentFixture<DocumentDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DocumentDialogComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: TranslateService, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: PosConfigToken, useValue: {} },
        { provide: DocumentService, useClass: DocumentServiceStub },
        provideHttpClient(withInterceptorsFromDi()),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    //  expect(component).toBeTruthy();
  });
});
