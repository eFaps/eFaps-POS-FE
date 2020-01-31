import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MockComponent } from 'ng-mocks';

import { DocumentComponent } from '../../shared/document/document.component';
import { DocumentDialogComponent } from './document-dialog.component';
import { PosConfigToken, DocumentService } from '@efaps/pos-library';

class DocumentServiceStub {}

describe('DocumentDialogComponent', () => {
  let component: DocumentDialogComponent;
  let fixture: ComponentFixture<DocumentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: PosConfigToken, useValue: {} },
        { provide: DocumentService, useClass: DocumentServiceStub },
      ],
      declarations: [
        DocumentDialogComponent,
        MockComponent(DocumentComponent),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
