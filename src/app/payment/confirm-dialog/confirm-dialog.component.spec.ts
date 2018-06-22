import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material';

import { MaterialModule } from '../../material/material.module';
import { DocumentType } from '../../model/index';
import { SharedModule } from '../../shared/shared.module';
import { ConfirmDialogComponent } from './confirm-dialog.component';

@Pipe({ name: 'posCurrency' })
class PosCurrencyPipeStub implements PipeTransform {
  transform(_value: number, _currency: string): any {
    return 'something';
  }
}

@Pipe({ name: 'translate' })
class TranslatePipeStub implements PipeTransform {
  transform(_value: number, _currency: string): any {
    return 'something';
  }
}

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        SharedModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA, useValue: {
            docType: DocumentType.RECEIPT,
            document: {
              number: '1234'
            },
            change: 33.44,
            currency: 'PEN'
          }
        },
      ],
      declarations: [
        ConfirmDialogComponent,
        PosCurrencyPipeStub,
        TranslatePipeStub
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
