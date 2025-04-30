import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RemoteComponent } from "./remote.component";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { PosConfigToken } from "@efaps/pos-library";

describe("RemoteComponent", () => {
  let component: RemoteComponent;
  let fixture: ComponentFixture<RemoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
         { provide: PosConfigToken, useValue: {} },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ],
      imports: [RemoteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RemoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
