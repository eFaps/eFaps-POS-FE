import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";

import { OpeningBalanceDialogComponent } from "./opening-balance-dialog.component";

describe("OpeningBalanceDialogComponent", () => {
  let component: OpeningBalanceDialogComponent;
  let fixture: ComponentFixture<OpeningBalanceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OpeningBalanceDialogComponent],
      providers: [FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(OpeningBalanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
