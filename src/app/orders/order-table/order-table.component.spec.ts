import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import {
  MissingTranslationHandler,
  TranslateCompiler,
  TranslateLoader,
  TranslateModule,
  TranslateParser,
  TranslateService,
  TranslateStore,
  USE_DEFAULT_LANG
} from '@ngx-translate/core';

import { HttpLoaderFactory } from '../../app.module';
import { MaterialModule } from '../../material/material.module';
import {
  AuthService,
  ConfigService,
  DocumentService,
  PosService,
  PosCurrencyPipe,
  UtilsService,
  WorkspaceService
} from '../../services/index';
import { OrderTableComponent } from './order-table.component';

describe('OrderTableComponent', () => {
  let component: OrderTableComponent;
  let fixture: ComponentFixture<OrderTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ],
      providers: [
        AuthService,
        HttpClient,
        HttpHandler,
        ConfigService,
        DocumentService,
        PosService,
        UtilsService,
        WorkspaceService
      ],
      declarations: [PosCurrencyPipe, OrderTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
