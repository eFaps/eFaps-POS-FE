import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Balance, BalanceService } from "@efaps/pos-library";
import { Observable } from "rxjs";

import { MatTableModule } from "@angular/material/table";
import { BalanceListComponent } from "./balance-list.component";

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
      imports: [
        BrowserAnimationsModule,
        MatDialogModule,
        MatTableModule,
        BalanceListComponent,
      ],
      providers: [{ provide: BalanceService, useClass: BalanceServiceStub }],
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
