import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';
import { MockDirective, MockPipe } from 'ng-mocks';
import { Observable } from 'rxjs/Observable';

import { PaymentService, PosService, WorkspaceService } from '../../services/index';
import { MaterialModule } from '../../material/material.module';
import { CommandsComponent } from './commands.component';

class PosServiceStub {
  currentOrder = new Observable(observer => {
    observer.next({});
  });
}
class PaymentServiceStub {
  currentDocument = new Observable(observer => {
    observer.next({});
  });
  currentPayments = new Observable(observer => {
    observer.next([]);
  });
  currentTotal = new Observable(observer => {
    observer.next({});
  });
}
class WorkspaceServiceStub {
  currentWorkspace = new Observable(observer => {
    observer.next({
      docTypes: []
    });
  });
}

describe('CommandsComponent', () => {
  let component: CommandsComponent;
  let fixture: ComponentFixture<CommandsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        RouterTestingModule
      ],
      providers: [
        { provide: PosService, useClass: PosServiceStub },
        { provide: PaymentService, useClass: PaymentServiceStub },
        { provide: WorkspaceService, useClass: WorkspaceServiceStub },
      ],
      declarations: [
        CommandsComponent,
        MockDirective(TranslateDirective),
        MockPipe(TranslatePipe, (...args) => 'Hallo')
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
