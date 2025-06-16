import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { OpeningBalanceDialogComponent } from "./opening-balance-dialog.component";

describe("OpeningBalanceDialogComponent", () => {
  let component: OpeningBalanceDialogComponent;
  let fixture: ComponentFixture<OpeningBalanceDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        OpeningBalanceDialogComponent,
      ],
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
