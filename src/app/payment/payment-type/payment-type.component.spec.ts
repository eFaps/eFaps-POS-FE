import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideZonelessChangeDetection } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  AuthService,
  Permission,
  PosConfigToken,
  WorkspaceService,
} from "@efaps/pos-library";
import { MockComponent } from "ng-mocks";
import { beforeEach, describe, expect, it } from "vitest";

import { AutoComponent } from "../auto/auto.component";
import { CardComponent } from "../card/card.component";
import { CashComponent } from "../cash/cash.component";
import { DiscountComponent } from "../discount/discount.component";
import { FreeComponent } from "../free/free.component";
import { PaymentTypeComponent } from "./payment-type.component";
class AuthServiceStub {
  getCurrentUsername() {
    return "usename";
  }
  hasPermission(...permissions: Permission[]) {
    return false;
  }
}

class WorkspaceServiceStub {
  hasAutoPayment() {
    return false;
  }
}

describe("PaymentTypeComponent", () => {
  let component: PaymentTypeComponent;
  let fixture: ComponentFixture<PaymentTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatTableModule,
        MatTabsModule,
        MockComponent(AutoComponent),
        MockComponent(CashComponent),
        MockComponent(CardComponent),
        MockComponent(DiscountComponent),
        MockComponent(FreeComponent),
        PaymentTypeComponent,
      ],
      providers: [
        provideZonelessChangeDetection(),
        { provide: PosConfigToken, useValue: {} },
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: WorkspaceService, useClass: WorkspaceServiceStub },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
