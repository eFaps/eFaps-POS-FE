import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { provideZonelessChangeDetection } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogModule } from "@angular/material/dialog";
import {
  PosConfigToken,
  PrintService,
  WorkspaceService,
} from "@efaps/pos-library";
import { MockComponent } from "ng-mocks";
import { Observable } from "rxjs";
import { beforeEach, describe, expect, it } from "vitest";

import { BalanceSummarySectionComponent } from "../balance-summary-section/balance-summary-section.component";
import { BalanceSummaryComponent } from "./balance-summary.component";
class WorkspaceServiceStub {
  currentWorkspace = new Observable((observer) => {
    observer.next(undefined);
  });
}

describe("BalanceSummaryComponent", () => {
  let component: BalanceSummaryComponent;
  let fixture: ComponentFixture<BalanceSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MockComponent(BalanceSummarySectionComponent),
        BalanceSummaryComponent,
      ],
      providers: [
        provideZonelessChangeDetection(),
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
      netTotals: [],
      crossTotals: [],
      paymentInfos: [],
      taxEntries: [],
    };

    fixture.componentRef.setInput("summary", {
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
    });

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
