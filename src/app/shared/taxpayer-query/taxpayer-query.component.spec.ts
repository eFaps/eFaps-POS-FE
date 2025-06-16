import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { EnquiryService } from "@efaps/pos-library";

import { TaxpayerQueryComponent } from "./taxpayer-query.component";

class EnquiryServiceStub {}

describe("TaxpayerQueryComponent", () => {
  let component: TaxpayerQueryComponent;
  let fixture: ComponentFixture<TaxpayerQueryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatDialogModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatSlideToggleModule,
        TaxpayerQueryComponent,
    ],
    providers: [
        { provide: EnquiryService, useClass: EnquiryServiceStub },
        { provide: MatDialogRef, useValue: {} },
    ],
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxpayerQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
