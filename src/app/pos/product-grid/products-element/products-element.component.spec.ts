import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideZonelessChangeDetection } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogModule } from "@angular/material/dialog";
import {
  InventoryService,
  PosConfigToken,
  PosService,
  ProductService,
  WorkspaceService,
} from "@efaps/pos-library";
import { Observable } from "rxjs";
import { beforeEach, describe, expect, it } from "vitest";
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

class WorkspaceServiceStub {
  showInventory() {
    return new Observable((observer) => {
      observer.next([]);
    });
  }
}

describe("ProductsElementComponent", () => {
  let component: ProductsElementComponent;
  let fixture: ComponentFixture<ProductsElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, ProductsElementComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: PosConfigToken, useValue: {} },
        { provide: WorkspaceService, useClass: WorkspaceServiceStub },
        { provide: ProductService, useClass: ProductServiceStub },
        { provide: PosService, useValue: {} },
        { provide: InventoryService, useValue: {} },
        { provide: PosService, useClass: PosServiceStub },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
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
