import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Contact, PosConfigToken } from "@efaps/pos-library";
import { ContactService } from "@efaps/pos-library";
import { TranslatePipe } from "@ngx-translate/core";
import { MockPipe } from "ng-mocks";
import { Observable } from "rxjs/Observable";

import { ContactTableComponent } from "./contact-table.component";

class ContactServiceStub {
  getContacts(): Observable<Contact[]> {
    return new Observable(observer => {
      observer.next([]);
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
        HttpClientTestingModule
      ],
      providers: [
        { provide: ContactService, useClass: ContactServiceStub },
        { provide: PosConfigToken, useValue: {} }
      ],
      declarations: [MockPipe(TranslatePipe), ContactTableComponent]
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
