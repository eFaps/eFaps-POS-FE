import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducttableComponent } from './producttable.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../material/material.module';
import { ProductService } from '../../services/index';
import { Observable } from 'rxjs/Observable';

class ProductServiceStub {
  getProducts() {
    return new Observable(observer => {
      observer.next([{ categoryOids: [] }]);
    });
  }
}

describe('ProducttableComponent', () => {
  let component: ProducttableComponent;
  let fixture: ComponentFixture<ProducttableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MaterialModule
      ],
      providers: [
        { provide: ProductService, useClass: ProductServiceStub },
      ],
      declarations: [ ProducttableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducttableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
