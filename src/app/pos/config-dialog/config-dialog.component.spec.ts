import { provideHttpClientTesting } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { PosConfigToken, ProductService } from "@efaps/pos-library";

import { ConfigDialogComponent } from "./config-dialog.component";
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";

describe("ConfigDialogComponent", () => {
  let component: ConfigDialogComponent;
  let fixture: ComponentFixture<ConfigDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigDialogComponent],
      imports: [ReactiveFormsModule],
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
        { provide: ProductService, useValue: {} },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
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
