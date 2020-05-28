import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { PosService, WorkspaceService } from "@efaps/pos-library";
import { Observable } from "rxjs/Observable";

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, RouterTestingModule],
      providers: [
        { provide: PosService, useClass: PosServiceStub },
        { provide: WorkspaceService, useClass: WorkspaceServiceStub },
      ],
      declarations: [WorkspaceComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
