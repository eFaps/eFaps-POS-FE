import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import {
  PosConfigToken,
  PosCurrencyPipe,
  PosService,
  ProductService,
  SecurePipe
} from "@efaps/pos-library";
import { MockPipe } from "ng-mocks";
import { Observable } from "rxjs/Observable";

import { ProductGridComponent } from "./product-grid.component";

class PosServiceStub {
  currentOrder = new Observable(observer => {
    observer.next({});
  });
  currentTicket = new Observable(observer => {
    observer.next({});
  });
}
class ProductServiceStub {
  getPosCategories() {
    return new Observable(observer => {
      observer.next([]);
    });
  }
}

describe("ProductgridComponent", () => {
  let component: ProductGridComponent;
  let fixture: ComponentFixture<ProductGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientModule,
        MatDialogModule
      ],
      providers: [
        { provide: PosConfigToken, useValue: {} },
        { provide: PosService, useClass: PosServiceStub },
        { provide: ProductService, useClass: ProductServiceStub }
      ],
      declarations: [
        ProductGridComponent,
        MockPipe(PosCurrencyPipe),
        MockPipe(SecurePipe)
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
