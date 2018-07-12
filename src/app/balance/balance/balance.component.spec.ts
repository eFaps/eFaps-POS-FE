import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs';

import { MaterialModule } from '../../material/material.module';
import { BalanceService } from '../../services';
import { BalanceComponent } from './balance.component';
import { BalanceDocumentListComponent } from '../balance-document-list/balance-document-list.component';
import { MockComponent } from 'ng-mocks';

class BalanceServiceStub {
  currentBalance = new Observable(observer => {
    observer.next([]);
  });
}

describe('BalanceComponent', () => {
  let component: BalanceComponent;
  let fixture: ComponentFixture<BalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MaterialModule
      ],
      providers: [
        { provide: BalanceService, useClass: BalanceServiceStub }
      ],
      declarations: [
        BalanceComponent,
        MockComponent(BalanceDocumentListComponent)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
