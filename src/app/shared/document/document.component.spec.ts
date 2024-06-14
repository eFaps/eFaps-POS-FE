import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { MatListModule } from "@angular/material/list";
import { MatTableModule } from "@angular/material/table";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import {
  PosConfigToken,
  PosCurrencyPipe,
  PrintService,
  WorkspaceService,
} from "@efaps/pos-library";
import { TranslatePipe } from "@ngx-translate/core";
import { MockPipe } from "ng-mocks";
import { Observable } from "rxjs";

import { DocumentComponent } from "./document.component";

const routerSpy = jasmine.createSpyObj("Router", ["navigate"]);

class WorkspaceServiceStub {
  currentWorkspace = new Observable((observer) => {
    observer.next({
      printCmds: [],
    });
  });
}
class PrintServiceStub {}

describe("DocumentComponent", () => {
  let component: DocumentComponent;
  let fixture: ComponentFixture<DocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [
        DocumentComponent,
        MockPipe(TranslatePipe),
        MockPipe(PosCurrencyPipe),
    ],
    imports: [BrowserAnimationsModule,
        RouterTestingModule,
        MatDialogModule,
        MatListModule,
        MatTableModule],
    providers: [
        { provide: PosConfigToken, useValue: {} },
        { provide: Router, useValue: routerSpy },
        { provide: WorkspaceService, useClass: WorkspaceServiceStub },
        { provide: PrintService, useClass: PrintServiceStub },
        provideHttpClient(withInterceptorsFromDi()),
    ]
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
