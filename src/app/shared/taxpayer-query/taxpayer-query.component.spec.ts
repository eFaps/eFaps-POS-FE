import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import {
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
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
