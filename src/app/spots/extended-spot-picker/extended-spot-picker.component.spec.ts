import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendedSpotPickerComponent } from './extended-spot-picker.component';

describe('ExtendedSpotPickerComponent', () => {
  let component: ExtendedSpotPickerComponent;
  let fixture: ComponentFixture<ExtendedSpotPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendedSpotPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendedSpotPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
