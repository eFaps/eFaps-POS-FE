import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTableModule } from "@angular/material/table";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BalanceService, DocumentService } from "@efaps/pos-library";
import { Observable } from "rxjs";

import { BalanceDocumentListComponent } from "./balance-document-list.component";

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

describe("BalanceDocumentListComponent", () => {
  let component: BalanceDocumentListComponent;
  let fixture: ComponentFixture<BalanceDocumentListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatDialogModule,
        MatTableModule,
        BalanceDocumentListComponent,
      ],
      providers: [
        { provide: DocumentService, useClass: DocumentServiceStub },
        { provide: BalanceService, useClass: BalanceServiceStub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceDocumentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
