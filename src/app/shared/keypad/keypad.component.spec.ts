import { ComponentFixture, TestBed, async } from "@angular/core/testing";
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, MatGridListModule, MatIconModule],
      providers: [{ provide: HotkeysService, useClass: HotkeysServiceStub }],
      declarations: [KeypadComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeypadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
