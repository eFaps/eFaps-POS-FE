import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatLegacyDialogRef as MatDialogRef } from "@angular/material/legacy-dialog";
import { MatLegacyFormFieldModule as MatFormFieldModule } from "@angular/material/legacy-form-field";
import { MatLegacyInputModule as MatInputModule } from "@angular/material/legacy-input";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MockComponent } from "ng-mocks";

import { KeypadComponent } from "../../shared/keypad/keypad.component";
import { SplitDialogComponent } from "./split-dialog.component";

describe("SplitDialogComponent", () => {
  let component: SplitDialogComponent;
  let fixture: ComponentFixture<SplitDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      providers: [{ provide: MatDialogRef, useValue: {} }],
      declarations: [SplitDialogComponent, MockComponent(KeypadComponent)],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
