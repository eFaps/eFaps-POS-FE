import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { PosConfigToken } from "@efaps/pos-library";

import { ConfigDialogComponent } from "./config-dialog.component";

describe("ConfigDialogComponent", () => {
  let component: ConfigDialogComponent;
  let fixture: ComponentFixture<ConfigDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [ConfigDialogComponent],
      providers: [
        { provide: PosConfigToken, useValue: {} },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            product: {
              configurationBOMs: [],
              bomGroupConfigs: [],
            },
          },
        },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
