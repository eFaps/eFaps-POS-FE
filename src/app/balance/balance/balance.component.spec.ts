import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  Balance,
  BalanceService,
  BalanceSummary,
  DocumentService,
  PosConfigToken
} from "@efaps/pos-library";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
import { NgBusyDirective } from "ng-busy";
import { MockComponent, MockDirective, MockPipe } from "ng-mocks";
import { Observable } from "rxjs";

import { BalanceDocumentListComponent } from "../balance-document-list/balance-document-list.component";
import { BalanceListComponent } from "../balance-list/balance-list.component";
import { BalancePaymentListComponent } from "../balance-payment-list/balance-payment-list.component";
import { BalanceSummaryComponent } from "../balance-summary/balance-summary.component";
import { DocumentListComponent } from "../document-list/document-list.component";
import { BalanceComponent } from "./balance.component";

class BalanceServiceStub {
  currentBalance = new Observable(observer => {
    observer.next([]);
  });
  getSummary(balance: Balance): Observable<BalanceSummary> {
    return new Observable();
  }
}

class DocumentServiceStub {
  getDocuments4Balance() {
    return new Observable(observer => {
      observer.next([]);
    });
  }
}

class TranslateServiceStub {}

describe("BalanceComponent", () => {
  let component: BalanceComponent;
  let fixture: ComponentFixture<BalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, HttpClientModule, MatDialogModule],
      providers: [
        { provide: BalanceService, useClass: BalanceServiceStub },
        { provide: DocumentService, useClass: DocumentServiceStub },
        { provide: TranslateService, useClass: TranslateServiceStub },
        { provide: PosConfigToken, useValue: {} }
      ],
      declarations: [
        BalanceComponent,
        MockComponent(BalanceSummaryComponent),
        MockComponent(BalanceListComponent),
        MockComponent(BalanceDocumentListComponent),
        MockComponent(BalancePaymentListComponent),
        MockComponent(DocumentListComponent),
        MockPipe(TranslatePipe),
        MockDirective(NgBusyDirective)
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
