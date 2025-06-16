import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatKeyboardService } from "@efaps/angular-onscreen-material-keyboard";
import { VirtKeyboardDirective } from "./virt-keyboard.directive";

class MockMatKeyboardService extends MatKeyboardService {}

@Component({ template: ` <div [appSameHeight]="aClassName"></div> ` })
class HostComponent {}

describe("VirtKeyboardDirective", () => {
  let fixture: ComponentFixture<HostComponent>;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [VirtKeyboardDirective, HostComponent],
      providers: [MockMatKeyboardService],
    }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it("should create an instance", () => {
    expect(fixture).toBeTruthy();
  });
});
