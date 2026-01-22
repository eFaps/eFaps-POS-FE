import { provideZonelessChangeDetection } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MockComponent } from "ng-mocks";
import { beforeEach, describe, expect, it } from "vitest";

import { KeypadComponent } from "../../shared/keypad/keypad.component";
import { SplitDialogComponent } from "./split-dialog.component";

describe("SplitDialogComponent", () => {
  let component: SplitDialogComponent;
  let fixture: ComponentFixture<SplitDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,

        MatFormFieldModule,
        MatInputModule,
        SplitDialogComponent,
        MockComponent(KeypadComponent),
      ],
      providers: [
        provideZonelessChangeDetection(),
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
