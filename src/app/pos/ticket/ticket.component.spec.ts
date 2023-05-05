import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { MatLegacySnackBarModule as MatSnackBarModule } from "@angular/material/legacy-snack-bar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { PosCurrencyPipe, PosService } from "@efaps/pos-library";
import { MockPipe } from "ng-mocks";
import { Observable } from "rxjs";

import { TicketComponent } from "./ticket.component";
import { MatLegacyTableModule as MatTableModule } from "@angular/material/legacy-table";

class PosServiceStub {
  currentOrder = new Observable((observer) => {
    observer.next({});
  });
  currentTicket = new Observable((observer) => {
    observer.next({});
  });
  currentCurrency = new Observable((observer) => {
    observer.next("");
  });
  multiplier = new Observable((observer) => {
    observer.next({});
  });
}

describe("TicketComponent", () => {
  let component: TicketComponent;
  let fixture: ComponentFixture<TicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        MatSnackBarModule,
        MatTableModule,
      ],
      providers: [{ provide: PosService, useClass: PosServiceStub }],
      declarations: [TicketComponent, MockPipe(PosCurrencyPipe)],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
