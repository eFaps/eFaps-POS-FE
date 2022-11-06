import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MockComponent } from "ng-mocks";
import { ContactComponent } from "src/app/shared/contact/contact.component";

import { ContactDialogComponent } from "./contact-dialog.component";

describe("ContactDialogComponent", () => {
  let component: ContactDialogComponent;
  let fixture: ComponentFixture<ContactDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [ContactDialogComponent, MockComponent(ContactComponent)],
      providers: [{ provide: MatDialogRef, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
