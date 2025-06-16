import { provideHttpClientTesting } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { PosConfigToken, PrintService } from "@efaps/pos-library";

import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { PrintDisplayComponent } from "./print-display.component";

describe("PrintDisplayComponent", () => {
  let component: PrintDisplayComponent;
  let fixture: ComponentFixture<PrintDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [MatProgressSpinnerModule, PrintDisplayComponent],
    providers: [
        { provide: PrintService, useValue: {} },
        { provide: PosConfigToken, useValue: {} },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
    ],
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
