import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BalanceService, DocumentService } from "@efaps/pos-library";
import { TranslatePipe } from "@ngx-translate/core";
import { MockPipe } from "ng-mocks";
import { Observable } from "rxjs";

import { BalancePaymentListComponent } from "./balance-payment-list.component";
import { MatListModule } from "@angular/material/list";

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, MatListModule],
      providers: [
        { provide: DocumentService, useClass: DocumentServiceStub },
        { provide: BalanceService, useClass: BalanceServiceStub },
      ],
      declarations: [BalancePaymentListComponent, MockPipe(TranslatePipe)],
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
