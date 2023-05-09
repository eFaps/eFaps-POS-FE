import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StocktakingInitComponent } from "./stocktaking-init.component";
import { InventoryService, PosConfigToken } from "@efaps/pos-library";
import { HttpClientModule } from "@angular/common/http";
import { MatDialogModule } from "@angular/material/dialog";
import {
  MatSnackBar,
  MatSnackBarModule,
} from "@angular/material/snack-bar";
import { FormBuilder } from "@angular/forms";
import { Observable } from "rxjs";

class InventoryServiceStub {
  getWarehouses() {
    return new Observable((observer) => {
      observer.next([]);
    });
  }
}

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
        { provide: InventoryService, useClass: InventoryServiceStub },
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
