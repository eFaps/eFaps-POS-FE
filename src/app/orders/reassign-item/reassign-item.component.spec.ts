import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReassignItemComponent } from './reassign-item.component';
import { MaterialModule } from '../../material/material.module';
import { MockPipe } from 'ng-mocks';
import { PosCurrencyPipe } from '@efaps/pos-library';

describe('ReassignItemComponent', () => {
  let component: ReassignItemComponent;
  let fixture: ComponentFixture<ReassignItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
      ],
      declarations: [
        MockPipe(PosCurrencyPipe),
        ReassignItemComponent
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReassignItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
