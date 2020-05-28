import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { Workspace, WorkspaceService } from "@efaps/pos-library";
import { MockComponent } from "ng-mocks";
import { Observable } from "rxjs";

import { BaseSpotPickerComponent } from "../base-spot-picker/base-spot-picker.component";
import { ExtendedSpotPickerComponent } from "../extended-spot-picker/extended-spot-picker.component";
import { SpotsComponent } from "./spots.component";

class WorkspaceServiceStub {
  currentWorkspace = new Observable<Workspace>();
}

describe("SpotsComponent", () => {
  let component: SpotsComponent;
  let fixture: ComponentFixture<SpotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: WorkspaceService, useClass: WorkspaceServiceStub },
      ],
      declarations: [
        MockComponent(BaseSpotPickerComponent),
        MockComponent(ExtendedSpotPickerComponent),
        SpotsComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
