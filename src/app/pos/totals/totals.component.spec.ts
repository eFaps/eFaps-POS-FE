import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslatePipe } from '@ngx-translate/core';
import { MockPipe } from 'ng-mocks';
import { Observable } from 'rxjs/Observable';

import { MaterialModule } from '../../material/material.module';
import { PosCurrencyPipe, PosService } from '@efaps/pos-library';
import { TotalsComponent } from './totals.component';

class PosServiceStub {
  currentOrder = new Observable(observer => {
    observer.next({});
  });
  currentTicket = new Observable(observer => {
    observer.next({});
  });
  currentCurrency = new Observable(observer => {
    observer.next('');
  });
  currentTaxes = new Observable(observer => {
    observer.next(new Map());
  });
  currentCrossTotal = new Observable(observer => {
    observer.next({});
  });
  currentNetTotal = new Observable(observer => {
    observer.next({});
  });
}

describe('TotalsComponent', () => {
  let component: TotalsComponent;
  let fixture: ComponentFixture<TotalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        RouterTestingModule
      ],
      providers: [
        { provide: PosService, useClass: PosServiceStub },
      ],
      declarations: [
        TotalsComponent,
        MockPipe(PosCurrencyPipe),
        MockPipe(TranslatePipe),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
