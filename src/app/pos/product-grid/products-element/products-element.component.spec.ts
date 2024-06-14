import { provideHttpClientTesting } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { PosConfigToken, PosService, ProductService } from "@efaps/pos-library";
import { Observable } from "rxjs";

import { ProductsElementComponent } from "./products-element.component";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
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
    declarations: [ProductsElementComponent],
    imports: [MatDialogModule],
    providers: [
        { provide: PosConfigToken, useValue: {} },
        { provide: PosService, useClass: PosServiceStub },
        { provide: ProductService, useClass: ProductServiceStub },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
    ]
}).compileComponents();

    fixture = TestBed.createComponent(ProductsElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
