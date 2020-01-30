import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintDisplayComponent } from './print-display.component';
import { MaterialModule } from '../../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { PosConfigToken } from '@efaps/pos-library';

describe('PrintDisplayComponent', () => {
  let component: PrintDisplayComponent;
  let fixture: ComponentFixture<PrintDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        HttpClientModule,
      ],
      providers: [
        { provide: PosConfigToken, useValue: {}}
      ],
      declarations: [ PrintDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
