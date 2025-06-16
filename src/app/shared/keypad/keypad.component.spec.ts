import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Hotkey, HotkeysService } from "angular2-hotkeys";

import { KeypadComponent } from "./keypad.component";

class HotkeysServiceStub {
  add() {}
  get() {}
  remove(_hotkey: Hotkey) {}
}

describe("KeypadComponent", () => {
  let component: KeypadComponent;
  let fixture: ComponentFixture<KeypadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatGridListModule,
        MatIconModule,
        KeypadComponent,
      ],
      providers: [{ provide: HotkeysService, useClass: HotkeysServiceStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeypadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
