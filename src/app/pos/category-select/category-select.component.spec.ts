import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material';
import { PosConfigToken, ProductService, Category } from '@efaps/pos-library';

import { CategorySelectComponent } from './category-select.component';
import { Observable } from 'rxjs';

class ProductServiceStub {
  getCategories(): Observable<Category[]> {
    return new Observable()
  }
}

describe('CategorySelectComponent', () => {
  let component: CategorySelectComponent;
  let fixture: ComponentFixture<CategorySelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [

        { provide: MatDialogRef, useValue: {} },
        { provide: PosConfigToken, useValue: {} },
        { provide: ProductService, useClass: ProductServiceStub }
      ],
      declarations: [CategorySelectComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
