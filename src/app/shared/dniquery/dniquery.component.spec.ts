import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DNIQueryComponent } from './dniquery.component';

describe('DNIQueryComponent', () => {
  let component: DNIQueryComponent;
  let fixture: ComponentFixture<DNIQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DNIQueryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DNIQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
