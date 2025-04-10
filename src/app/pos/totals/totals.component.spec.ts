import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatListModule } from "@angular/material/list";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { PosCurrencyPipe, PosService, PromoInfo } from "@efaps/pos-library";
import { TranslatePipe } from "@ngx-translate/core";
import { MockPipe } from "ng-mocks";
import { Observable } from "rxjs";

import { signal } from "@angular/core";
import { TotalsComponent } from "./totals.component";

class PosServiceStub {
  currentOrder = new Observable((observer) => {
    observer.next({});
  });
  currentTicket = new Observable((observer) => {
    observer.next({});
  });
  currentCurrency = new Observable((observer) => {
    observer.next("");
  });
  currentTaxes = new Observable((observer) => {
    observer.next(new Map());
  });
  currentCrossTotal = new Observable((observer) => {
    observer.next({});
  });
  currentNetTotal = new Observable((observer) => {
    observer.next({});
  });
  currentPayableAmount = new Observable((observer) => {
    observer.next({});
  });
  promotionInfo = signal<PromoInfo | null>(null);
}

describe("TotalsComponent", () => {
  let component: TotalsComponent;
  let fixture: ComponentFixture<TotalsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, RouterTestingModule, MatListModule],
      providers: [{ provide: PosService, useClass: PosServiceStub }],
      declarations: [
        TotalsComponent,
        MockPipe(PosCurrencyPipe),
        MockPipe(TranslatePipe),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
