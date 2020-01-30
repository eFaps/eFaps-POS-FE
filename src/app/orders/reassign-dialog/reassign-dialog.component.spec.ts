import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PosConfigToken } from '@efaps/pos-library';
import { MockComponent } from 'ng-mocks';

import { MaterialModule } from '../../material/material.module';
import { ReassignItemComponent } from '../reassign-item/reassign-item.component';
import { ReassignDialogComponent } from './reassign-dialog.component';

describe('ReassignDialogComponent', () => {
  let component: ReassignDialogComponent;
  let fixture: ComponentFixture<ReassignDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        HttpClientModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: PosConfigToken, useValue: {} },
      ],
      declarations: [
        MockComponent(ReassignItemComponent),
        ReassignDialogComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReassignDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
