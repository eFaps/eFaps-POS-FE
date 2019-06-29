import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseSpotPickerComponent } from './base-spot-picker.component';

describe('BaseSpotPickerComponent', () => {
  let component: BaseSpotPickerComponent;
  let fixture: ComponentFixture<BaseSpotPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseSpotPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseSpotPickerComponent);
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

});
