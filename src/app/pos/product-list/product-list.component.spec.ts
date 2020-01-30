import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService, InventoryService, PosService, ProductService, WorkspaceService } from '@efaps/pos-library';
import { MockComponent } from 'ng-mocks';
import { Observable } from 'rxjs/Observable';

import { MaterialModule } from '../../material/material.module';
import { ProductComponent } from '../../shared/product/product.component';
import { ProductListComponent } from './product-list.component';

class PosServiceStub {
  currentOrder = new Observable(observer => {
    observer.next({});
  });
  currentTicket = new Observable(observer => {
    observer.next({});
  });
}
class ProductServiceStub {}
class WorkspaceServiceStub {
  showInventory() {
    return false;
  }
}
class InventoryServiceStub {}
class AuthServiceStub {}

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: PosService, useClass: PosServiceStub },
        { provide: ProductService, useClass: ProductServiceStub },
        { provide: WorkspaceService, useClass: WorkspaceServiceStub },
        { provide: InventoryService, useClass: InventoryServiceStub },
        { provide: AuthService, useClass: AuthServiceStub }
      ],
      declarations: [
        MockComponent(ProductComponent),
        ProductListComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
