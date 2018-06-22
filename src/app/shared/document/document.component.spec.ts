import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslatePipe } from '@ngx-translate/core';
import { MockPipe } from 'ng-mocks';

import { MaterialModule } from '../../material/material.module';
import { PosCurrencyPipe } from '../../services';
import { DocumentComponent } from './document.component';
import { Router } from '@angular/router';

const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

describe('DocumentComponent', () => {
  let component: DocumentComponent;
  let fixture: ComponentFixture<DocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        RouterTestingModule
      ],
      providers: [
        { provide: Router,      useValue: routerSpy }
      ],
      declarations: [
        DocumentComponent,
        MockPipe(TranslatePipe),
        MockPipe(PosCurrencyPipe)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
