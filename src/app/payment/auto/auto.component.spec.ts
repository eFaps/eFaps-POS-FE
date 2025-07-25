import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  CollectService,
  Collector,
  MsgService,
  PaymentService,
} from "@efaps/pos-library";
import { TranslatePipe } from "@ngx-translate/core";
import { MockComponent, MockPipe } from "ng-mocks";
import { Observable } from "rxjs";

import { KeypadComponent } from "../../shared/keypad/keypad.component";
import { AutoComponent } from "./auto.component";

class CollectServiceStub {
  getCollectors(): Observable<Collector[]> {
    return new Observable();
  }
}
class PaymentServiceStub {
  currentPayments = new Observable((observer) => {
    observer.next([]);
  });
  currentDocument = new Observable((observer) => {
    observer.next([]);
  });
  currentTotal = new Observable((observer) => {
    observer.next([]);
  });
}

class MsgServiceStub {}

describe("AutoComponent", () => {
  let component: AutoComponent;
  let fixture: ComponentFixture<AutoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatFormFieldModule,
        AutoComponent,
        MockPipe(TranslatePipe),
        MockComponent(KeypadComponent),
      ],
      providers: [
        { provide: MsgService, useClass: MsgServiceStub },
        { provide: CollectService, useClass: CollectServiceStub },
        { provide: PaymentService, useClass: PaymentServiceStub },
        provideHttpClient(withInterceptorsFromDi()),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
