import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PosConfigToken } from "@efaps/pos-library";
import { MockComponent } from "ng-mocks";

import { AutoComponent } from "../auto/auto.component";
import { CardComponent } from "../card/card.component";
import { CashComponent } from "../cash/cash.component";
import { DiscountComponent } from "../discount/discount.component";
import { FreeComponent } from "../free/free.component";
import { PaymentTypeComponent } from "./payment-type.component";

describe("PaymentTypeComponent", () => {
  let component: PaymentTypeComponent;
  let fixture: ComponentFixture<PaymentTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatTabsModule,
      ],
      providers: [{ provide: PosConfigToken, useValue: {} }],
      declarations: [
        MockComponent(AutoComponent),
        MockComponent(CashComponent),
        MockComponent(CardComponent),
        MockComponent(DiscountComponent),
        MockComponent(FreeComponent),
        PaymentTypeComponent,
      ],
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
