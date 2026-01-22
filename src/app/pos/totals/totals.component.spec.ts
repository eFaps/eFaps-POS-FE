import { provideZonelessChangeDetection, signal } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatListModule } from "@angular/material/list";
import { PosService, PromoInfo, UtilsService } from "@efaps/pos-library";
import { Observable } from "rxjs";
import { beforeEach, describe, expect, it } from "vitest";
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
        MatListModule,
        TotalsComponent,
        // MockPipe(PosCurrencyPipe),
        // MockPipe(TranslatePipe),
      ],
      providers: [
        provideZonelessChangeDetection(),
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
