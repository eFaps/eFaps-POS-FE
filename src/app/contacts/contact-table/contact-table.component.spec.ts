import { provideHttpClientTesting } from "@angular/common/http/testing";
import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTableModule } from "@angular/material/table";
import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  ConfigService,
  Contact,
  ContactService,
  Page,
  PosConfigToken,
} from "@efaps/pos-library";
import { TranslatePipe } from "@ngx-translate/core";
import { MockPipe } from "ng-mocks";
import { Observable } from "rxjs";

import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { ContactTableComponent } from "./contact-table.component";

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

class ConfigServiceStub {
  getSystemConfig(): Observable<Page<Contact>> {
    return new Observable((observer) => {});
  }
}

describe("ContactTableComponent", () => {
  let component: ContactTableComponent;
  let fixture: ComponentFixture<ContactTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatSortModule,
        MockPipe(TranslatePipe),
        ContactTableComponent,
      ],
      providers: [
        { provide: ConfigService, useClass: ConfigServiceStub },
        { provide: ContactService, useClass: ContactServiceStub },
        { provide: PosConfigToken, useValue: {} },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
  });

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
