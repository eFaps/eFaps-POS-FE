import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponent } from 'ng-mocks';
import { Observable } from 'rxjs/Observable';

import { MaterialModule } from '../../material/material.module';
import { ProductComponent } from '../../products/product/product.component';
import { ProductService, VirtKeyboardDirective } from '../../services/index';
import { ProducttableComponent } from './producttable.component';
import { MatKeyboardModule } from '@ngx-material-keyboard/core';

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
        MaterialModule,
        MatKeyboardModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: ProductService, useClass: ProductServiceStub },
      ],
      declarations: [
        VirtKeyboardDirective,
        MockComponent(ProductComponent),
        ProducttableComponent
      ]
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
