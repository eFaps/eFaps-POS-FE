import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Balance, BalanceService } from "@efaps/pos-library";
import { Observable } from "rxjs";

import { BalanceListComponent } from "./balance-list.component";
import { MatTableModule } from "@angular/material/table";

class BalanceServiceStub {
  getBalances(): Observable<Balance[]> {
    return new Observable();
  }
}

describe("BalanceListComponent", () => {
  let component: BalanceListComponent;
  let fixture: ComponentFixture<BalanceListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, MatDialogModule, MatTableModule],
      providers: [{ provide: BalanceService, useClass: BalanceServiceStub }],
      declarations: [BalanceListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
