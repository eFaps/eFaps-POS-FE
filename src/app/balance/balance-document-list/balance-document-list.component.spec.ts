import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceDocumentListComponent } from './balance-document-list.component';

describe('BalanceDocumentListComponent', () => {
  let component: BalanceDocumentListComponent;
  let fixture: ComponentFixture<BalanceDocumentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceDocumentListComponent ]
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
