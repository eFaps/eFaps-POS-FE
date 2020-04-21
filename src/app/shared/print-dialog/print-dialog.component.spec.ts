import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PrintService } from "@efaps/pos-library";
import { MockComponent } from "ng-mocks";
import { Observable } from "rxjs/Observable";

import { PrintDisplayComponent } from "../print-display/print-display.component";
import { PrintDialogComponent } from "./print-dialog.component";

class PrintServiceStub {}

describe("PrintDialogComponent", () => {
  let component: PrintDialogComponent;
  let fixture: ComponentFixture<PrintDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      providers: [
        { provide: PrintService, useClass: PrintServiceStub },
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA,
          useValue: new Observable(observer => {
            observer.next([]);
          })
        }
      ],
      declarations: [PrintDialogComponent, MockComponent(PrintDisplayComponent)]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
