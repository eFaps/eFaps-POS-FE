import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import {
  MatSnackBar,
  MatSnackBarModule,
} from "@angular/material/snack-bar";
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
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
      ],
      declarations: [ExtendedSpotPickerComponent, MockPipe(TranslatePipe)],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendedSpotPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
