import { provideHttpClientTesting } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { PosConfigToken } from "@efaps/pos-library";

import { SuccessDialogComponent } from "./success-dialog.component";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

describe("SuccessDialogComponent", () => {
  let component: SuccessDialogComponent;
  let fixture: ComponentFixture<SuccessDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [SuccessDialogComponent],
    imports: [MatDialogModule],
    providers: [
        { provide: MatDialogRef, useValue: {} },
        {
            provide: MAT_DIALOG_DATA,
            useValue: {
                document: {
                    number: "Test",
                },
            },
        },
        {
            provide: PosConfigToken,
            useValue: {
                order: "",
            },
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
    ]
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
