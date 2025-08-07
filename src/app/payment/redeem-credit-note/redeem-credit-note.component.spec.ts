import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RedeemCreditNoteComponent } from "./redeem-credit-note.component";

describe("RedeemCreditNoteComponent", () => {
  let component: RedeemCreditNoteComponent;
  let fixture: ComponentFixture<RedeemCreditNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedeemCreditNoteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RedeemCreditNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
