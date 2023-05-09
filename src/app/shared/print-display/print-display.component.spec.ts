import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { PosConfigToken } from "@efaps/pos-library";

import { PrintDisplayComponent } from "./print-display.component";

describe("PrintDisplayComponent", () => {
  let component: PrintDisplayComponent;
  let fixture: ComponentFixture<PrintDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatProgressSpinnerModule],
      providers: [{ provide: PosConfigToken, useValue: {} }],
      declarations: [PrintDisplayComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
