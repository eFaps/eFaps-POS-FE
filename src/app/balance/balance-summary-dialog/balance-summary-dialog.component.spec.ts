import { provideZonelessChangeDetection } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Balance, BalanceService, BalanceSummary } from "@efaps/pos-library";
import { MockComponent } from "ng-mocks";
import { Observable } from "rxjs";
import { beforeEach, describe, expect, it } from "vitest";
import { BalanceSummaryComponent } from "../balance-summary/balance-summary.component";
import { BalanceSummaryDialogComponent } from "./balance-summary-dialog.component";

class BalanceServiceStub {
  getSummary(balance: Balance): Observable<BalanceSummary> {
    return new Observable();
  }
}

describe("BalanceSummaryDialogComponent", () => {
  let component: BalanceSummaryDialogComponent;
  let fixture: ComponentFixture<BalanceSummaryDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MockComponent(BalanceSummaryComponent),
        BalanceSummaryDialogComponent,
      ],
      providers: [
        provideZonelessChangeDetection(),
        { provide: BalanceService, useClass: BalanceServiceStub },
        { provide: MAT_DIALOG_DATA, useValue: [] },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceSummaryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
