import {
  afterRenderEffect,
  AfterViewInit,
  Component,
  computed,
  effect,
  ElementRef,
  HostListener,
  inject,
  signal,
  ViewEncapsulation,
} from "@angular/core";

import { KeyboardService } from "src/app/services/keyboard.service";

@Component({
  selector: "app-keyboard",
  imports: [],
  templateUrl: "./keyboard.component.html",
  styleUrl: "./keyboard.component.scss",
  encapsulation: ViewEncapsulation.None,
})
export class KeyboardComponent implements AfterViewInit {
  private elementRef = inject(ElementRef);
  private keyboardService = inject(KeyboardService);

  hidden = computed(() => {
    return this.keyboardService.hidden();
  });

  enabled = computed(() => {
    return this.keyboardService.enabled();
  });

  constructor() {
    afterRenderEffect(() => {
      var isEnabled = this.enabled();
      if (isEnabled) {
        this.keyboardService.initKeyboard();
      }
    });
  }

  ngAfterViewInit(): void {
    this.keyboardService.initKeyboard();
  }

  @HostListener("document:click", ["$event"])
  click(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.keyboardService.clickedOutside(event.target);
    }
  }
}
