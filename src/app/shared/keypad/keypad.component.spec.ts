import { provideZonelessChangeDetection } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { Hotkey, HotkeysService } from "angular2-hotkeys";
import { beforeEach, describe, expect, it } from "vitest";

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
      imports: [MatGridListModule, MatIconModule, KeypadComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: HotkeysService, useClass: HotkeysServiceStub },
      ],
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
