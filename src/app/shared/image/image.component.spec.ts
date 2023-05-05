import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import {
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
  MatLegacyDialogRef as MatDialogRef,
} from "@angular/material/legacy-dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Observable } from "rxjs";

import { ImageComponent } from "./image.component";

describe("ImageComponent", () => {
  let component: ImageComponent;
  let fixture: ComponentFixture<ImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA,
          useValue: new Observable((observer) => {
            observer.next(new Blob());
          }),
        },
      ],
      declarations: [ImageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
