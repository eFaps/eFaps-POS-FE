import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent, MockDirective, MockPipe } from 'ng-mocks';
import { Observable } from 'rxjs/Observable';

import { MaterialModule } from '../material/material.module';
import { MsgService, PosService } from '../services/index';
import { CommandsComponent } from './commands/commands.component';
import { PosComponent } from './pos.component';
import { ProductgridComponent } from './productgrid/productgrid.component';
import { TicketComponent } from './ticket/ticket.component';
import { TotalsComponent } from './totals/totals.component';

class PosServiceStub {
  currentOrder = new Observable(observer => {
    observer.next({});
  });
  currentTicket = new Observable(observer => {
    observer.next({});
  });
}
class MsgServiceStub {
  currentOrder = new Observable(observer => {
    observer.next();
  });
  init() {

  }
  publishStartEditOrder(_id) {

  }
  publishFinishEditOrder(_id) {

  }
}

describe('PosComponent', () => {
  let component: PosComponent;
  let fixture: ComponentFixture<PosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        RouterTestingModule
      ],
      providers: [
        { provide: PosService, useClass: PosServiceStub },
        { provide: MsgService, useClass: MsgServiceStub }
      ],
      declarations: [
        PosComponent,
        MockComponent(ProductgridComponent),
        MockComponent(TicketComponent),
        MockComponent(TotalsComponent),
        MockComponent(CommandsComponent)
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
