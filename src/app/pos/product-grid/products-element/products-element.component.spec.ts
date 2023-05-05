import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatLegacyDialogModule as MatDialogModule } from "@angular/material/legacy-dialog";
import { PosConfigToken, PosService, ProductService } from "@efaps/pos-library";
import { Observable } from "rxjs";

import { ProductsElementComponent } from "./products-element.component";
class PosServiceStub {
  currentOrder = new Observable((observer) => {
    observer.next({});
  });
  currentTicket = new Observable((observer) => {
    observer.next({});
  });
  multiplier = new Observable((observer) => {
    observer.next({});
  });
}
class ProductServiceStub {
  getPosCategories() {
    return new Observable((observer) => {
      observer.next([]);
    });
  }
}
describe("ProductsElementComponent", () => {
  let component: ProductsElementComponent;
  let fixture: ComponentFixture<ProductsElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatDialogModule],
      declarations: [ProductsElementComponent],
      providers: [
        { provide: PosConfigToken, useValue: {} },
        { provide: PosService, useClass: PosServiceStub },
        { provide: ProductService, useClass: ProductServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
