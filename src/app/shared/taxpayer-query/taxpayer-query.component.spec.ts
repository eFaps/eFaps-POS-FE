import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxpayerQueryComponent } from './taxpayer-query.component';
import { TaxpayerService } from '@efaps/pos-library';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../material/material.module';
import { RouterTestingModule } from '@angular/router/testing/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

class TaxpayerServiceStub {

}

describe('TaxpayerQueryComponent', () => {
  let component: TaxpayerQueryComponent;
  let fixture: ComponentFixture<TaxpayerQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
      ],
      declarations: [ TaxpayerQueryComponent ],
      providers: [
        { provide: TaxpayerService, useClass: TaxpayerServiceStub }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxpayerQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
