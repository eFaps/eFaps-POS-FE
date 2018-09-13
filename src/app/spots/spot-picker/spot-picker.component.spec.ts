import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslatePipe } from '@ngx-translate/core';
import { MockPipe } from 'ng-mocks';
import { Observable } from 'rxjs/Observable';

import { MaterialModule } from '../../material/material.module';
import { DocumentService } from '../../services/document.service';
import { PosService, SpotService, WorkspaceService } from '../../services/index';
import { SpotPickerComponent } from './spot-picker.component';

class PosServiceStub { }
class DocumentServiceStub { }
class WorkspaceServiceStub { }
class SpotServiceStub {
  getSpots() {
    return new Observable(observer => {
      observer.next([]);
    });
  }
}

describe('SpotPickerComponent', () => {
  let component: SpotPickerComponent;
  let fixture: ComponentFixture<SpotPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        RouterTestingModule
      ],
      providers: [
        { provide: PosService, useClass: PosServiceStub },
        { provide: DocumentService, useClass: DocumentServiceStub },
        { provide: WorkspaceService, useClass: WorkspaceServiceStub },
        { provide: SpotService, useClass: SpotServiceStub },
      ],
      declarations: [
        SpotPickerComponent,
        MockPipe(TranslatePipe),
      ]
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
