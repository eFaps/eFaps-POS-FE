import { provideHttpClientTesting } from "@angular/common/http/testing";
import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTableModule } from "@angular/material/table";
import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Contact, Page, PosConfigToken } from "@efaps/pos-library";
import { ContactService } from "@efaps/pos-library";
import { TranslatePipe } from "@ngx-translate/core";
import { MockPipe } from "ng-mocks";
import { Observable } from "rxjs";

import { ContactTableComponent } from "./contact-table.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

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
    declarations: [MockPipe(TranslatePipe), ContactTableComponent],
    imports: [BrowserAnimationsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatSortModule],
    providers: [
        { provide: ContactService, useClass: ContactServiceStub },
        { provide: PosConfigToken, useValue: {} },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
    ]
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
