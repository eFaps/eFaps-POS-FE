import { provideZonelessChangeDetection } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DocumentService, PaymentService } from "@efaps/pos-library";
import { Observable } from "rxjs/internal/Observable";
import { beforeEach, describe, expect, it } from "vitest";

import { RedeemCreditNoteComponent } from "./redeem-credit-note.component";
describe("RedeemCreditNoteComponent", () => {
  let component: RedeemCreditNoteComponent;
  let fixture: ComponentFixture<RedeemCreditNoteComponent>;
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
  class DocumentServiceStub {}
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedeemCreditNoteComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: PaymentService, useClass: PaymentServiceStub },
        { provide: DocumentService, useClass: DocumentServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RedeemCreditNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
