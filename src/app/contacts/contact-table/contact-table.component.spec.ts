import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatLegacyDialogModule as MatDialogModule } from "@angular/material/legacy-dialog";
import { MatLegacyTableModule as MatTableModule } from "@angular/material/legacy-table";
import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Contact, Page, PosConfigToken } from "@efaps/pos-library";
import { ContactService } from "@efaps/pos-library";
import { TranslatePipe } from "@ngx-translate/core";
import { MockPipe } from "ng-mocks";
import { Observable } from "rxjs";

import { ContactTableComponent } from "./contact-table.component";
import { MatLegacyFormFieldModule as MatFormFieldModule } from "@angular/material/legacy-form-field";
import { MatLegacyInputModule as MatInputModule } from "@angular/material/legacy-input";
import { MatLegacyPaginatorModule as MatPaginatorModule } from "@angular/material/legacy-paginator";
import { MatSortModule } from "@angular/material/sort";

class ContactServiceStub {
  getContacts(): Observable<Page<Contact>> {
    return new Observable((observer) => {
      observer.next({
        content: [],
        pageable: {
          sort: { sorted: true, unsorted: true, empty: true },
          pageNumber: 1,
          pageSize: 1,
          offset: 1,
          paged: true,
          unpaged: true,
        },
        totalPages: 1,
        totalElements: 1,
        last: true,
        first: true,
        sort: { sorted: true, unsorted: true, empty: true },
        numberOfElements: 1,
        size: 1,
        number: 1,
        empty: true,
      });
    });
  }
}

describe("ContactTableComponent", () => {
  let component: ContactTableComponent;
  let fixture: ComponentFixture<ContactTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatDialogModule,
        HttpClientTestingModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatSortModule,
      ],
      providers: [
        { provide: ContactService, useClass: ContactServiceStub },
        { provide: PosConfigToken, useValue: {} },
      ],
      declarations: [MockPipe(TranslatePipe), ContactTableComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render the create button", () => {
    const baseDe: DebugElement = fixture.debugElement;
    const buttonDe = baseDe.query(By.css("button"));
    expect(buttonDe).toBeTruthy();
  });
});
