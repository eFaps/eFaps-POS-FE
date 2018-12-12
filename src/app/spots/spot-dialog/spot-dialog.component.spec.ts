import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslatePipe } from '@ngx-translate/core';
import { MockPipe } from 'ng-mocks';

import { MaterialModule } from '../../material/material.module';
import { DocumentService, WorkspaceService } from '../../services';
import { SpotDialogComponent } from './spot-dialog.component';
import { Observable, of } from 'rxjs';
import { Order } from '../../model';

class DocumentServiceStub {
  public getOrders4Spots(): Observable<Order[]> {
    return of([]);
  }
}
class WorkspaceServiceStub { }

describe('SpotDialogComponent', () => {
  let component: SpotDialogComponent;
  let fixture: ComponentFixture<SpotDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        RouterTestingModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: DocumentService, useClass: DocumentServiceStub },
        { provide: WorkspaceService, useClass: WorkspaceServiceStub }
      ],
      declarations: [
        SpotDialogComponent,
        MockPipe(TranslatePipe),
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
