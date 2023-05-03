import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StocktakingComponent } from "./stocktaking.component";
import { PosConfigToken } from "@efaps/pos-library";
import { MatDialogModule } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormBuilder } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MatAutocomplete } from "@angular/material/autocomplete";

class ActivatedRouteStub {
  params = new Observable((observer) => {});
}

describe("StocktakingComponent", () => {
  let component: StocktakingComponent;
  let fixture: ComponentFixture<StocktakingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StocktakingComponent, MatAutocomplete],
      imports: [MatDialogModule, HttpClientModule],
      providers: [
        MatSnackBar,
        FormBuilder,
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: PosConfigToken, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StocktakingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
