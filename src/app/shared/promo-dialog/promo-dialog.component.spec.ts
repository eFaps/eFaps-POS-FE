import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PromoDialogComponent } from "./promo-dialog.component";
import { PromotionService } from "@efaps/pos-library";
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

describe("PromoDialogComponent", () => {
  let component: PromoDialogComponent;
  let fixture: ComponentFixture<PromoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromoDialogComponent],
      providers: [
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
