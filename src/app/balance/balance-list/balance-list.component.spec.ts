import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Balance, BalanceService } from "@efaps/pos-library";
import { Observable } from "rxjs";

import { MaterialModule } from "../../material/material.module";
import { BalanceListComponent } from "./balance-list.component";

class BalanceServiceStub {
  getBalances(): Observable<Balance[]> {
    return new Observable();
  }
}

describe("BalanceListComponent", () => {
  let component: BalanceListComponent;
  let fixture: ComponentFixture<BalanceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, BrowserAnimationsModule],
      providers: [{ provide: BalanceService, useClass: BalanceServiceStub }],
      declarations: [BalanceListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
