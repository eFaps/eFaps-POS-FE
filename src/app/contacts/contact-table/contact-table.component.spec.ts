import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '../../material/material.module';
import { ContactService } from '../../services/index';
import { ContactTableComponent } from './contact-table.component';
import { Observable } from 'rxjs/Observable';
import { Contact } from '../../model/index';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

class ContactServiceStub {
  getContacts(): Observable<Contact[]> {
    return new Observable(observer => {
      observer.next([]);
    });
  }
}

describe('ContactTableComponent', () => {
  let component: ContactTableComponent;
  let fixture: ComponentFixture<ContactTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MaterialModule
      ],
      providers: [
        { provide: ContactService, useClass: ContactServiceStub }
      ],
      declarations: [ContactTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the create button', () => {
    const baseDe: DebugElement = fixture.debugElement;
    const buttonDe = baseDe.query(By.css('button'));
    expect(buttonDe).toBeTruthy();
  });
});
