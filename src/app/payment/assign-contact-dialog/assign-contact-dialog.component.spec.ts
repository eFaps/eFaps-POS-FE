import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { PosConfigToken } from "@efaps/pos-library";
import {
  provideTranslateService,
  TranslatePipe,
  TranslateService,
} from "@ngx-translate/core";
import { MockPipe } from "ng-mocks";
import { beforeEach, describe, expect, it } from "vitest";

import { AssignContactDialogComponent } from "./assign-contact-dialog.component";

describe("AssignContactDialogComponent", () => {
  let component: AssignContactDialogComponent;
  let fixture: ComponentFixture<AssignContactDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignContactDialogComponent, MockPipe(TranslatePipe)],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        { provide: PosConfigToken, useValue: {} },
        provideTranslateService({ fallbackLang: "en" }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AssignContactDialogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
