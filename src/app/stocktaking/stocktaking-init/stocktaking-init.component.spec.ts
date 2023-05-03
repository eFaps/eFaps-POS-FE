import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StocktakingInitComponent } from "./stocktaking-init.component";
import { PosConfigToken } from "@efaps/pos-library";
import { HttpClientModule } from "@angular/common/http";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { FormBuilder } from "@angular/forms";

describe("StocktakingInitComponent", () => {
  let component: StocktakingInitComponent;
  let fixture: ComponentFixture<StocktakingInitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StocktakingInitComponent],
      imports: [HttpClientModule, MatDialogModule, MatSnackBarModule],

      providers: [
        FormBuilder,
        MatSnackBar,

        { provide: PosConfigToken, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StocktakingInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
