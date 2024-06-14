import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogRef } from "@angular/material/dialog";
import { PosConfigToken, ProductService, Category } from "@efaps/pos-library";

import { CategorySelectComponent } from "./category-select.component";
import { Observable } from "rxjs";

class ProductServiceStub {
  getCategories(): Observable<Category[]> {
    return new Observable();
  }
}

describe("CategorySelectComponent", () => {
  let component: CategorySelectComponent;
  let fixture: ComponentFixture<CategorySelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategorySelectComponent],
      imports: [],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: PosConfigToken, useValue: {} },
        { provide: ProductService, useClass: ProductServiceStub },
        provideHttpClient(withInterceptorsFromDi()),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
