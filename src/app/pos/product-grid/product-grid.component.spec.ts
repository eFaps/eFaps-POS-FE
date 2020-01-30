import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent, MockDirective, MockPipe } from 'ng-mocks';
import { Observable } from 'rxjs/Observable';

import { MaterialModule } from '../../material/material.module';
import { PaymentService, PosService, ProductService, SecurePipe, WorkspaceService } from '@efaps/pos-library';
import { ProductGridComponent } from './product-grid.component';


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

describe('ProductgridComponent', () => {
  let component: ProductGridComponent;
  let fixture: ComponentFixture<ProductGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        RouterTestingModule
      ],
      providers: [
        { provide: PosService, useClass: PosServiceStub },
        { provide: ProductService, useClass: ProductServiceStub }
      ],
      declarations: [
        ProductGridComponent,
        MockPipe(SecurePipe)
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
