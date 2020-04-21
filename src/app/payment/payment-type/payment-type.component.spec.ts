import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PaymentTypeComponent } from "./payment-type.component";

import { MockComponent } from "ng-mocks";
import { CashComponent } from "../cash/cash.component";
import { CardComponent } from "../card/card.component";
import { DiscountComponent } from "../discount/discount.component";
import { FreeComponent } from "../free/free.component";
import { AutoComponent } from "../auto/auto.component";
import { HttpClientModule } from "@angular/common/http";
import { PosConfigToken } from "@efaps/pos-library";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe("PaymentTypeComponent", () => {
  let component: PaymentTypeComponent;
  let fixture: ComponentFixture<PaymentTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, BrowserAnimationsModule],
      providers: [{ provide: PosConfigToken, useValue: {} }],
      declarations: [
        MockComponent(AutoComponent),
        MockComponent(CashComponent),
        MockComponent(CardComponent),
        MockComponent(DiscountComponent),
        MockComponent(FreeComponent),
        PaymentTypeComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
