import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {
  PosConfigToken,
  PosCurrencyPipe,
  PrintService
} from "@efaps/pos-library";
import { MockComponent, MockPipe } from "ng-mocks";

import { MaterialModule } from "../../material/material.module";
import { PrintDisplayComponent } from "../../shared/print-display/print-display.component";
import { SuccessDialogComponent } from "./success-dialog.component";

class PrintServiceSub {}

describe("SuccessDialogComponent", () => {
  let component: SuccessDialogComponent;
  let fixture: ComponentFixture<SuccessDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, HttpClientModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            docType: 0,
            change: 0,
            document: {
              number: 123
            }
          }
        },
        { provide: PosConfigToken, useValue: {} },
        { provide: PrintService, useClass: PrintServiceSub }
      ],
      declarations: [
        MockPipe(PosCurrencyPipe),
        MockComponent(PrintDisplayComponent),
        SuccessDialogComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
