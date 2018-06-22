import { HttpClient, HttpHandler } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { MaterialModule } from '../../material/material.module';
import { AdminService } from '../../services/index';
import { AdminComponent } from './admin.component';

class AdminServiceStub {
  version(): Observable<string> {
    return new Observable(observer => {
      observer.next('BE-Version');
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
      declarations: [AdminComponent]
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
    expect(p.textContent).toContain(`Frontend: ${environment.version}`);
  });

  it('should render the BE-Version', () => {
    const baseDe: DebugElement = fixture.debugElement;
    const versionsDe = baseDe.query(By.css('.versions'));
    const p: HTMLElement = versionsDe.nativeElement;
    expect(p.textContent).toContain('Backend: BE-Version');
  });


});
