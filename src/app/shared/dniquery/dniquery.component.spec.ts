import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DNIQueryComponent } from "./dniquery.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { EnquiryService } from "@efaps/pos-library";

class EnquiryServiceStub {}

describe("DNIQueryComponent", () => {
  let component: DNIQueryComponent;
  let fixture: ComponentFixture<DNIQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DNIQueryComponent],
      providers: [{ provide: EnquiryService, useClass: EnquiryServiceStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(DNIQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
