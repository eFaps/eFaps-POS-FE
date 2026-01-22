import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideZonelessChangeDetection } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";
import {
  DocumentService,
  ImageService,
  PosConfigToken,
  PosService,
  SpotService,
  SpotsLayout,
} from "@efaps/pos-library";
import { TranslatePipe } from "@ngx-translate/core";
import { MockPipe } from "ng-mocks";
import { Observable } from "rxjs";
import { beforeEach, describe, expect, it } from "vitest";
import { ExtendedSpotPickerComponent } from "./extended-spot-picker.component";

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
      imports: [
        MatDialogModule,
        MatSnackBarModule,
        MatIconModule,
        MatTabsModule,
        MatTooltipModule,
        MatButtonModule,
        ExtendedSpotPickerComponent,
        MockPipe(TranslatePipe),
      ],
      providers: [
        provideZonelessChangeDetection(),
        { provide: PosService, useClass: PosServiceStub },
        { provide: DocumentService, useValue: {} },
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
