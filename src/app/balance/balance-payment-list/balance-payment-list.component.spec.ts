import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatListModule } from "@angular/material/list";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BalanceService, DocumentService } from "@efaps/pos-library";
import { TranslatePipe } from "@ngx-translate/core";
import { MockPipe } from "ng-mocks";
import { Observable } from "rxjs";

import { BalancePaymentListComponent } from "./balance-payment-list.component";

class BalanceServiceStub {
  currentBalance = new Observable((observer) => {
    observer.next([]);
  });
}

class DocumentServiceStub {
  getDocuments4Balance() {
    return new Observable((observer) => {
      observer.next([]);
    });
  }
}

describe("BalancePaymentListComponent", () => {
  let component: BalancePaymentListComponent;
  let fixture: ComponentFixture<BalancePaymentListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatListModule,
        BalancePaymentListComponent,
        MockPipe(TranslatePipe),
      ],
      providers: [
        { provide: DocumentService, useClass: DocumentServiceStub },
        { provide: BalanceService, useClass: BalanceServiceStub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalancePaymentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
