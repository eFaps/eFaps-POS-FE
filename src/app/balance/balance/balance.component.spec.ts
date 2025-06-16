import { provideHttpClientTesting } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  Balance,
  BalanceService,
  BalanceSummary,
  ConfigService,
  DocumentService,
  PosConfigToken,
  PrintService,
  WorkspaceService,
} from "@efaps/pos-library";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
import { MockComponent, MockPipe } from "ng-mocks";
import { Observable } from "rxjs";

import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { MatTabsModule } from "@angular/material/tabs";
import { BalanceDocumentListComponent } from "../balance-document-list/balance-document-list.component";
import { BalanceListComponent } from "../balance-list/balance-list.component";
import { BalancePaymentListComponent } from "../balance-payment-list/balance-payment-list.component";
import { BalanceSummaryComponent } from "../balance-summary/balance-summary.component";
import { DocumentListComponent } from "../document-list/document-list.component";
import { BalanceComponent } from "./balance.component";

class BalanceServiceStub {
  currentBalance = new Observable((observer) => {
    observer.next([]);
  });
  getSummary(balance: Balance): Observable<BalanceSummary> {
    return new Observable();
  }
}

class DocumentServiceStub {
  getDocuments4Balance() {
    return new Observable((observer) => {
      observer.next([]);
    });
  }
}

class WorkspaceServiceStub {
  currentWorkspace = new Observable((observer) => {
    observer.next({
      printCmds: [],
    });
  });
}

class TranslateServiceStub {}

class ConfigServiceStub {
  getSystemConfig(key: string) {
    return new Observable((observer) => {
      observer.next([]);
    });
  }
}

describe("BalanceComponent", () => {
  let component: BalanceComponent;
  let fixture: ComponentFixture<BalanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatDialogModule,
        MatTabsModule,
        BalanceComponent,
        MockComponent(BalanceSummaryComponent),
        MockComponent(BalanceListComponent),
        MockComponent(BalanceDocumentListComponent),
        MockComponent(BalancePaymentListComponent),
        MockComponent(DocumentListComponent),
        MockPipe(TranslatePipe),
      ],
      providers: [
        { provide: BalanceService, useClass: BalanceServiceStub },
        { provide: DocumentService, useClass: DocumentServiceStub },
        { provide: PrintService, useValue: {} },
        { provide: WorkspaceService, useClass: WorkspaceServiceStub },
        { provide: TranslateService, useClass: TranslateServiceStub },
        { provide: ConfigService, useClass: ConfigServiceStub },
        { provide: PosConfigToken, useValue: {} },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
