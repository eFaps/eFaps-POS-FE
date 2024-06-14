import { provideHttpClientTesting } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterTestingModule } from "@angular/router/testing";
import {
  ImageService,
  PosConfigToken,
  PosService,
  SpotService,
  SpotsLayout,
} from "@efaps/pos-library";
import { TranslatePipe } from "@ngx-translate/core";
import { MockPipe } from "ng-mocks";
import { Observable } from "rxjs";

import { ExtendedSpotPickerComponent } from "./extended-spot-picker.component";
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";

class PosServiceStub {}
class SpotServiceStub {
  getLayout(): Observable<SpotsLayout> {
    return new Observable();
  }
}
class ImageServiceStub {}

describe("ExtendedSpotPickerComponent", () => {
  let component: ExtendedSpotPickerComponent;
  let fixture: ComponentFixture<ExtendedSpotPickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExtendedSpotPickerComponent, MockPipe(TranslatePipe)],
      imports: [
        RouterTestingModule,
        MatDialogModule,
        MatSnackBarModule,
        MatIconModule,
        MatTabsModule,
        MatTooltipModule,
        MatButtonModule,
      ],
      providers: [
        { provide: PosService, useClass: PosServiceStub },
        { provide: SpotService, useClass: SpotServiceStub },
        { provide: ImageService, useClass: ImageServiceStub },
        { provide: PosConfigToken, useValue: {} },
        { provide: MatSnackBar, useClass: MatSnackBar },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendedSpotPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
