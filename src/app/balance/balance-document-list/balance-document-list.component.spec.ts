import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslatePipe } from '@ngx-translate/core';
import { MockPipe } from 'ng-mocks';
import { Observable } from 'rxjs';

import { MaterialModule } from '../../material/material.module';
import { BalanceService, DocumentService, PosCurrencyPipe } from '../../services';
import { BalanceDocumentListComponent } from './balance-document-list.component';

class BalanceServiceStub {
  currentBalance = new Observable(observer => {
    observer.next([]);
  });
}

class DocumentServiceStub { }

describe('BalanceDocumentListComponent', () => {
  let component: BalanceDocumentListComponent;
  let fixture: ComponentFixture<BalanceDocumentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MaterialModule
      ],
      providers: [
        { provide: DocumentService, useClass: DocumentServiceStub },
        { provide: BalanceService, useClass: BalanceServiceStub }
      ],
      declarations: [
        BalanceDocumentListComponent,
        MockPipe(PosCurrencyPipe),
        MockPipe(TranslatePipe)
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceDocumentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
