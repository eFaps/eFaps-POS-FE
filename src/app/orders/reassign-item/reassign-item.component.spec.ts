import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { PosCurrencyPipe } from '@efaps/pos-library';
import { MockPipe } from 'ng-mocks';

import { MaterialModule } from '../../material/material.module';
import { ReassignItemComponent } from './reassign-item.component';

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
