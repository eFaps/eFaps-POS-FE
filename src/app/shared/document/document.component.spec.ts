import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import {
  PosConfigToken,
  PosCurrencyPipe,
  PrintService,
  WorkspaceService
} from "@efaps/pos-library";
import { TranslatePipe } from "@ngx-translate/core";
import { MockPipe } from "ng-mocks";
import { Observable } from "rxjs/Observable";

import { MaterialModule } from "../../material/material.module";
import { DocumentComponent } from "./document.component";

const routerSpy = jasmine.createSpyObj("Router", ["navigate"]);

class WorkspaceServiceStub {
  currentWorkspace = new Observable(observer => {
    observer.next({
      printCmds: []
    });
  });
}
class PrintServiceStub {}

describe("DocumentComponent", () => {
  let component: DocumentComponent;
  let fixture: ComponentFixture<DocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [
        { provide: PosConfigToken, useValue: {} },
        { provide: Router, useValue: routerSpy },
        { provide: WorkspaceService, useClass: WorkspaceServiceStub },
        { provide: PrintService, useClass: PrintServiceStub }
      ],
      declarations: [
        DocumentComponent,
        MockPipe(TranslatePipe),
        MockPipe(PosCurrencyPipe)
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
