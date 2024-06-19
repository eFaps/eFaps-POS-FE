import { ComponentFixture, TestBed } from "@angular/core/testing";

import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { EnquiryService } from "@efaps/pos-library";
import { DNIQueryComponent } from "./dniquery.component";

class EnquiryServiceStub {}

describe("DNIQueryComponent", () => {
  let component: DNIQueryComponent;
  let fixture: ComponentFixture<DNIQueryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DNIQueryComponent],
      imports: [],
      providers: [
        { provide: EnquiryService, useClass: EnquiryServiceStub },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DNIQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
