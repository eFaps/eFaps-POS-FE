import { provideHttpClientTesting } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { PosConfigToken } from "@efaps/pos-library";

import { PrintDisplayComponent } from "./print-display.component";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

describe("PrintDisplayComponent", () => {
  let component: PrintDisplayComponent;
  let fixture: ComponentFixture<PrintDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [PrintDisplayComponent],
    imports: [MatProgressSpinnerModule],
    providers: [{ provide: PosConfigToken, useValue: {} }, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
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
