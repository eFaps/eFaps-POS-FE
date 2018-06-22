import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockPipe } from 'ng-mocks';
import { Observable } from 'rxjs/Observable';

import { MaterialModule } from '../../material/material.module';
import {
  InventoryService,
  PosCurrencyPipe,
  PosService,
  ProductService,
  SecurePipe,
  WorkspaceService
} from '../../services/index';
import { ProductComponent } from './product.component';

class WorkspaceServiceStub {
  currentWorkspace = new Observable(observer => {
    observer.next({
      docTypes: []
    });
  });
  showInventory() {
    return false;
  }
}
class ProductServiceStub {
  getProduct(_oid) {
    return new Observable(observer => {
      observer.next({ categoryOids: [] });
    });
  }
}
class PosServiceStub {
  currentOrder = new Observable(observer => {
    observer.next({});
  });
  currentCurrency = new Observable(observer => {
    observer.next('PEN');
  });
}
class InventoryServiceStub { }

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MaterialModule
      ],
      providers: [
        { provide: ProductService, useClass: ProductServiceStub },
        { provide: PosService, useClass: PosServiceStub },
        { provide: InventoryService, useClass: InventoryServiceStub },
        { provide: WorkspaceService, useClass: WorkspaceServiceStub },
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA, useValue: {
            oid: '132.456'
          }
        },
      ],
      declarations: [
        ProductComponent,
        MockPipe(SecurePipe),
        MockPipe(PosCurrencyPipe)
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
