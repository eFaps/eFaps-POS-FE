import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogModule } from "@angular/material/dialog";
import {
  PosConfigToken,
  PrintService,
  WorkspaceService,
} from "@efaps/pos-library";
import { MockComponent } from "ng-mocks";

import { Observable } from "rxjs";
import { BalanceSummarySectionComponent } from "../balance-summary-section/balance-summary-section.component";
import { BalanceSummaryComponent } from "./balance-summary.component";

class WorkspaceServiceStub {
  currentWorkspace = new Observable((observer) => {
    observer.next();
  });
}

describe("BalanceSummaryComponent", () => {
  let component: BalanceSummaryComponent;
  let fixture: ComponentFixture<BalanceSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MockComponent(BalanceSummarySectionComponent),
        BalanceSummaryComponent,
      ],
      imports: [MatDialogModule],
      providers: [
        { provide: PosConfigToken, useValue: {} },
        { provide: WorkspaceService, useClass: WorkspaceServiceStub },
        { provide: PrintService, useValue: {} },
        provideHttpClient(withInterceptorsFromDi()),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceSummaryComponent);
    component = fixture.componentInstance;
    const detail = {
      documentCount: 0,
      paymentCount: 0,
      netTotal: 0,
      crossTotal: 0,
      paymentInfos: [],
      taxEntries: [],
    };
    component.summary = {
      balance: {
        id: "",
        oid: "",
        number: "",
        startAt: new Date(),
        endAt: new Date(),
        status: "OPEN",
      },
      cashEntries: [],
      detail: detail,
      invoiceDetail: detail,
      receiptDetail: detail,
      ticketDetail: detail,
      creditNoteDetail: detail,
    };
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
