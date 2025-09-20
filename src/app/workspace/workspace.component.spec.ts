import { provideZonelessChangeDetection } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { PosService, WorkspaceService } from "@efaps/pos-library";
import { Observable } from "rxjs";

import { WorkspaceComponent } from "./workspace.component";

class PosServiceStub {
  getPoss() {
    return new Observable((observer) => {
      observer.next([]);
    });
  }
}

class WorkspaceServiceStub {
  getWorkspaces() {
    return new Observable((observer) => {
      observer.next([]);
    });
  }
}
describe("WorkspaceComponent", () => {
  let component: WorkspaceComponent;
  let fixture: ComponentFixture<WorkspaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        WorkspaceComponent,
      ],
      providers: [
        provideZonelessChangeDetection(),
        { provide: PosService, useClass: PosServiceStub },
        { provide: WorkspaceService, useClass: WorkspaceServiceStub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
