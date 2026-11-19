import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ConfigService, PosConfigToken } from "@efaps/pos-library";
import { provideTranslateService, TranslatePipe } from "@ngx-translate/core";
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
        ConfigService,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        { provide: PosConfigToken, useValue: {} },
        provideTranslateService({ fallbackLang: "en" }),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
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
