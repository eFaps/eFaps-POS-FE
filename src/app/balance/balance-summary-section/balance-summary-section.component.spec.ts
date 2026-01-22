import { provideZonelessChangeDetection } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Currency } from "@efaps/pos-library";
import { beforeEach, describe, expect, it } from "vitest";

import { BalanceSummarySectionComponent } from "./balance-summary-section.component";

describe("BalanceSummarySectionComponent", () => {
  let component: BalanceSummarySectionComponent;
  let fixture: ComponentFixture<BalanceSummarySectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BalanceSummarySectionComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceSummarySectionComponent);
    component = fixture.componentInstance;
    component.detail = {
      documentCount: 1,
      paymentCount: 1,
      netTotals: [{ currency: Currency.PEN, amount: 10 }],
      crossTotals: [{ currency: Currency.PEN, amount: 10 }],
      paymentInfos: [],
      taxEntries: [],
    };
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
