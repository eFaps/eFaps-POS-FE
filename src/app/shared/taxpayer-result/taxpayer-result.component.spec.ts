import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { EnquiryService, Page, PageRequest, RUC } from "@efaps/pos-library";
import { Observable } from "rxjs";

import { TaxpayerResultComponent } from "./taxpayer-result.component";

class EnquiryServiceStub {
  public findRUCs(term: string, pageable?: PageRequest): Observable<Page<RUC>> {
    return new Observable((observer) => {
      observer.next({
        content: [],
        pageable: {
          sort: { sorted: false, unsorted: true, empty: true },
          pageNumber: 0,
          pageSize: 20,
          offset: 0,
          paged: true,
          unpaged: true,
        },
        totalPages: 0,
        totalElements: 0,
        last: true,
        first: true,
        sort: { sorted: false, unsorted: true, empty: true },
        numberOfElements: 0,
        size: 0,
        number: 0,
        empty: true,
      });
    });
  }
}

describe("TaxpayerResultComponent", () => {
  let component: TaxpayerResultComponent;
  let fixture: ComponentFixture<TaxpayerResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [NoopAnimationsModule, MatPaginatorModule, MatTableModule, TaxpayerResultComponent],
    providers: [
        { provide: EnquiryService, useClass: EnquiryServiceStub },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
    ],
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxpayerResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
