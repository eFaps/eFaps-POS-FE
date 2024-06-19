import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import {
  AdminService,
  ConfigService,
  Extension,
  Versions,
} from "@efaps/pos-library";
import { TranslatePipe } from "@ngx-translate/core";
import { MockPipe } from "ng-mocks";
import { Observable } from "rxjs";

import { ReactiveFormsModule } from "@angular/forms";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { AdminComponent } from "./admin.component";

class AdminServiceStub {
  version(): Observable<Versions> {
    return new Observable((observer) => {
      observer.next({
        remote: "Remote1",
        local: "Local1",
      });
    });
  }
}
class ConfigServiceStub {
  getExtensions(): Observable<Extension[]> {
    return new Observable((observer) => {
      observer.next([
        {
          key: "KEY",
          tag: "TAG",
          url: "URL",
        },
      ]);
    });
  }
  getSystemConfig(): Observable<boolean> {
    return new Observable((observer) => {
      observer.next(false);
    });
  }
}

describe("AdminComponent", () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatSlideToggleModule],
      providers: [
        { provide: AdminService, useClass: AdminServiceStub },
        { provide: ConfigService, useClass: ConfigServiceStub },
      ],
      declarations: [AdminComponent, MockPipe(TranslatePipe)],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render the FE-Version", () => {
    const baseDe: DebugElement = fixture.debugElement;
    const versionsDe = baseDe.query(By.css(".versions"));
    const p: HTMLElement = versionsDe.nativeElement;
    expect(p.textContent).toContain(`Local: Local1`);
  });

  it("should render the BE-Version", () => {
    const baseDe: DebugElement = fixture.debugElement;
    const versionsDe = baseDe.query(By.css(".versions"));
    const p: HTMLElement = versionsDe.nativeElement;
    expect(p.textContent).toContain("Cloud: Remote1");
  });
});
