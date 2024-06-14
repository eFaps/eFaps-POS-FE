import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  CollectService,
  MsgService,
  PaymentService,
  Collector,
} from "@efaps/pos-library";
import { TranslatePipe } from "@ngx-translate/core";
import { MockComponent, MockPipe } from "ng-mocks";
import { Observable } from "rxjs";

import { KeypadComponent } from "../../shared/keypad/keypad.component";
import { AutoComponent } from "./auto.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatRadioModule } from "@angular/material/radio";
import { MatInputModule } from "@angular/material/input";

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [
        AutoComponent,
        MockPipe(TranslatePipe),
        MockComponent(KeypadComponent),
    ],
    imports: [BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatFormFieldModule],
    providers: [
        { provide: MsgService, useClass: MsgServiceStub },
        { provide: CollectService, useClass: CollectServiceStub },
        { provide: PaymentService, useClass: PaymentServiceStub },
        provideHttpClient(withInterceptorsFromDi()),
    ]
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
