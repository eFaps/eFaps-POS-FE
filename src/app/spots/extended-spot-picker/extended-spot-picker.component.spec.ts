import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { RouterTestingModule } from "@angular/router/testing";
import {
  ImageService,
  PosConfigToken,
  PosService,
  SpotService,
  SpotsLayout
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
        HttpClientModule,
        MatDialogModule,
        MatSnackBarModule
      ],
      providers: [
        { provide: PosService, useClass: PosServiceStub },
        { provide: SpotService, useClass: SpotServiceStub },
        { provide: ImageService, useClass: ImageServiceStub },
        { provide: PosConfigToken, useValue: {} }
      ],
      declarations: [ExtendedSpotPickerComponent, MockPipe(TranslatePipe)]
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
