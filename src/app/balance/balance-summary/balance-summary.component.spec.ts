import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { PosConfigToken } from "@efaps/pos-library";
import { MockComponent } from "ng-mocks";

import { BalanceSummarySectionComponent } from "../balance-summary-section/balance-summary-section.component";
import { BalanceSummaryComponent } from "./balance-summary.component";

describe("BalanceSummaryComponent", () => {
  let component: BalanceSummaryComponent;
  let fixture: ComponentFixture<BalanceSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatDialogModule],
      providers: [{ provide: PosConfigToken, useValue: {} }],
      declarations: [
        MockComponent(BalanceSummarySectionComponent),
        BalanceSummaryComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
