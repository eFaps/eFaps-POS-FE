import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReassignItemComponent } from './reassign-item.component';

describe('ReassignItemComponent', () => {
  let component: ReassignItemComponent;
  let fixture: ComponentFixture<ReassignItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReassignItemComponent ]
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
