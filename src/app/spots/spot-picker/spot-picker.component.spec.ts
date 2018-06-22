import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotPickerComponent } from './spot-picker.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../material/material.module';
import { PosService, SpotService, WorkspaceService } from '../../services/index';
import { DocumentService } from '../../services/document.service';
import { Observable } from 'rxjs/Observable';
import { RouterTestingModule } from '@angular/router/testing';

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
      declarations: [SpotPickerComponent]
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
