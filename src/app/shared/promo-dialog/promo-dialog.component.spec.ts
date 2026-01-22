import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideZonelessChangeDetection } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { PromotionService } from "@efaps/pos-library";
import { beforeEach, describe, expect, it } from "vitest";

import { PromoDialogComponent } from "./promo-dialog.component";
describe("PromoDialogComponent", () => {
  let component: PromoDialogComponent;
  let fixture: ComponentFixture<PromoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromoDialogComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: PromotionService, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            promoInfo: {
              details: [],
              promotionOids: [],
            },
          },
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PromoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
