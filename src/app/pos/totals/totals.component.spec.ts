import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatListModule } from "@angular/material/list";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { PosService, PromoInfo, UtilsService } from "@efaps/pos-library";
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

class UtilsServiceStub {
  getCurrencySymbol() {
    return "S./";
  }
}

describe("TotalsComponent", () => {
  let component: TotalsComponent;
  let fixture: ComponentFixture<TotalsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        MatListModule,
        TotalsComponent,
        // MockPipe(PosCurrencyPipe),
        // MockPipe(TranslatePipe),
      ],
      providers: [
        { provide: PosService, useClass: PosServiceStub },
        { provide: UtilsService, useClass: UtilsServiceStub },
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
