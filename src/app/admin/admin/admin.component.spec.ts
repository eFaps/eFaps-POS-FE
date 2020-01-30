import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { By } from '@angular/platform-browser';
import { AdminService, Versions } from '@efaps/pos-library';
import { TranslatePipe } from '@ngx-translate/core';
import { NgBusyDirective } from 'ng-busy';
import { MockDirective, MockPipe } from 'ng-mocks';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { MaterialModule } from '../../material/material.module';
import { AdminComponent } from './admin.component';

class AdminServiceStub {
  version(): Observable<Versions> {
    return new Observable(observer => {
      observer.next({
          remote: 'Remote1',
          local: 'Local1'
      });
    });
  }
}

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FlexLayoutModule,
        MaterialModule
      ],
      providers: [
        { provide: AdminService, useClass: AdminServiceStub }
      ],
      declarations: [
        AdminComponent,
        MockPipe(TranslatePipe),
        MockDirective(NgBusyDirective)
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the FE-Version', () => {
    const baseDe: DebugElement = fixture.debugElement;
    const versionsDe = baseDe.query(By.css('.versions'));
    const p: HTMLElement = versionsDe.nativeElement;
    expect(p.textContent).toContain(`Local: Local1`);
  });

  it('should render the BE-Version', () => {
    const baseDe: DebugElement = fixture.debugElement;
    const versionsDe = baseDe.query(By.css('.versions'));
    const p: HTMLElement = versionsDe.nativeElement;
    expect(p.textContent).toContain('Cloud: Remote1');
  });


});
