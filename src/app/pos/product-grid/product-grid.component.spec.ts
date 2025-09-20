import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideZonelessChangeDetection } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTabsModule } from "@angular/material/tabs";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import {
  InventoryService,
  PosConfigToken,
  PosCurrencyPipe,
  PosService,
  ProductService,
  SecurePipe,
  WorkspaceService,
} from "@efaps/pos-library";
import { MockPipe } from "ng-mocks";
import { Observable } from "rxjs";

import { ProductGridComponent } from "./product-grid.component";

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
  getCategoryTree() {
    return new Observable((observer) => {
      observer.next([]);
    });
  }
}
class WorkspaceServiceStub {
  showInventory() {
    return new Observable((observer) => {
      observer.next(false);
    });
  }
  currentWorkspace = new Observable((observer) => {
    observer.next(undefined);
  });
}

describe("ProductgridComponent", () => {
  let component: ProductGridComponent;
  let fixture: ComponentFixture<ProductGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        MatDialogModule,
        MatTabsModule,
        ProductGridComponent,
        MockPipe(PosCurrencyPipe),
        MockPipe(SecurePipe),
      ],
      providers: [
        provideZonelessChangeDetection(),
        { provide: PosConfigToken, useValue: {} },
        { provide: WorkspaceService, useClass: WorkspaceServiceStub },
        { provide: ProductService, useClass: ProductServiceStub },
        { provide: PosService, useClass: PosServiceStub },
        { provide: InventoryService, useValue: {} },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
