import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotPickerComponent } from './spot-picker.component';

describe('SpotPickerComponent', () => {
  let component: SpotPickerComponent;
  let fixture: ComponentFixture<SpotPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpotPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
