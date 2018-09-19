import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '../../material/material.module';
import { PosService } from '../../services';
import { SplitOrderDialogComponent } from './split-order-dialog.component';

class PosServiceStub { }

describe('SplitOrderDialogComponent', () => {
  let component: SplitOrderDialogComponent;
  let fixture: ComponentFixture<SplitOrderDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MaterialModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA, useValue: {
            items: []
          }
        },
        { provide: PosService, useClass: PosServiceStub }
      ],
      declarations: [
        SplitOrderDialogComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
