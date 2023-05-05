import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import {
  MatLegacyDialogModule as MatDialogModule,
  MatLegacyDialogRef as MatDialogRef,
} from "@angular/material/legacy-dialog";
import { MatLegacyFormFieldModule as MatFormFieldModule } from "@angular/material/legacy-form-field";
import { MatLegacyInputModule as MatInputModule } from "@angular/material/legacy-input";
import { MatLegacyPaginatorModule as MatPaginatorModule } from "@angular/material/legacy-paginator";
import { MatLegacySlideToggleModule as MatSlideToggleModule } from "@angular/material/legacy-slide-toggle";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { TaxpayerService } from "@efaps/pos-library";

import { TaxpayerQueryComponent } from "./taxpayer-query.component";

class TaxpayerServiceStub {}

describe("TaxpayerQueryComponent", () => {
  let component: TaxpayerQueryComponent;
  let fixture: ComponentFixture<TaxpayerQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatDialogModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatSlideToggleModule,
      ],
      declarations: [TaxpayerQueryComponent],
      providers: [
        { provide: TaxpayerService, useClass: TaxpayerServiceStub },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxpayerQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
