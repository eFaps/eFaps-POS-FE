import { ComponentFixture, TestBed } from "@angular/core/testing";

import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { FormBuilder } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import {
  PosConfigToken,
  ProductService,
  StocktakingService,
} from "@efaps/pos-library";
import { Observable } from "rxjs";
import { StocktakingComponent } from "./stocktaking.component";

class ActivatedRouteStub {
  params = new Observable((observer) => {});
}

class StocktakingServiceStub {}
class RouterStub {
  getCurrentNavigation() {
    return {
      extras: {
        state: {},
      },
    };
  }
}
describe("StocktakingComponent", () => {
  let component: StocktakingComponent;
  let fixture: ComponentFixture<StocktakingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StocktakingComponent],
      imports: [MatDialogModule, MatAutocompleteModule],
      providers: [
        MatSnackBar,
        FormBuilder,
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: StocktakingService, useClass: StocktakingServiceStub },
        { provide: ProductService, useValue: {} },
        { provide: PosConfigToken, useValue: {} },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
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
