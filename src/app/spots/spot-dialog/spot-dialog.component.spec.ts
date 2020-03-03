import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { Spot, SpotService } from "@efaps/pos-library";
import { TranslatePipe } from "@ngx-translate/core";
import { MockPipe } from "ng-mocks";
import { Observable, of } from "rxjs";

import { MaterialModule } from "../../material/material.module";
import { SpotDialogComponent } from "./spot-dialog.component";

class SpotServiceStub {
  getSpots(): Observable<Spot[]> {
    return new Observable();
  }
}

describe("SpotDialogComponent", () => {
  let component: SpotDialogComponent;
  let fixture: ComponentFixture<SpotDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, MaterialModule, RouterTestingModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: SpotService, useClass: SpotServiceStub }
      ],
      declarations: [SpotDialogComponent, MockPipe(TranslatePipe)]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
