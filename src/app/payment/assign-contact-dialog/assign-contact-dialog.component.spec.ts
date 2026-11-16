import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AssignContactDialogComponent } from "./assign-contact-dialog.component";

describe("AssignContactDialogComponent", () => {
  let component: AssignContactDialogComponent;
  let fixture: ComponentFixture<AssignContactDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignContactDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssignContactDialogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
