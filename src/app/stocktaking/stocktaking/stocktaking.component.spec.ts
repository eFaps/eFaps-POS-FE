import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StocktakingComponent } from "./stocktaking.component";
import { PosConfigToken, StocktakingService } from "@efaps/pos-library";
import { MatLegacyDialogModule as MatDialogModule } from "@angular/material/legacy-dialog";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { MatLegacySnackBar as MatSnackBar } from "@angular/material/legacy-snack-bar";
import { FormBuilder } from "@angular/forms";
import { MatLegacyAutocomplete as MatAutocomplete } from "@angular/material/legacy-autocomplete";
import { HttpClientTestingModule } from "@angular/common/http/testing";

class ActivatedRouteStub {
  params = new Observable((observer) => {});
}

class StocktakingServiceStub {}

describe("StocktakingComponent", () => {
  let component: StocktakingComponent;
  let fixture: ComponentFixture<StocktakingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StocktakingComponent, MatAutocomplete],
      imports: [MatDialogModule, HttpClientTestingModule],
      providers: [
        MatSnackBar,
        FormBuilder,
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: StocktakingService, useClass: StocktakingServiceStub },
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
