import { HttpClientModule } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from "@angular/material/legacy-dialog";
import { MatLegacyPaginatorModule as MatPaginatorModule } from "@angular/material/legacy-paginator";
import { MatLegacyTableModule as MatTableModule } from "@angular/material/legacy-table";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { Taxpayer, TaxpayerService } from "@efaps/pos-library";
import { Page, PageRequest } from "@efaps/pos-library/lib/model/pageable";
import { Observable } from "rxjs";

import { TaxpayerResultComponent } from "./taxpayer-result.component";

class TaxpayerServiceStub {
  public findTaxpayers(
    term: string,
    pageable?: PageRequest
  ): Observable<Page<Taxpayer>> {
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NoopAnimationsModule,
        MatPaginatorModule,
        MatTableModule,
      ],
      declarations: [TaxpayerResultComponent],
      providers: [
        { provide: TaxpayerService, useClass: TaxpayerServiceStub },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxpayerResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
