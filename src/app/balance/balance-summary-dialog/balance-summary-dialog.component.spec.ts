import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Balance, BalanceService, BalanceSummary } from "@efaps/pos-library";
import { MockComponent } from "ng-mocks";
import { Observable } from "rxjs";

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
        BrowserAnimationsModule,
        MockComponent(BalanceSummaryComponent),
        BalanceSummaryDialogComponent,
      ],
      providers: [
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
