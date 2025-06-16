import {
  AfterViewChecked,
  Directive,
  ElementRef,
  HostListener,
  inject,
  input
} from "@angular/core";

@Directive({ selector: "[appSameHeight]", })
export class SameHeightDirective implements AfterViewChecked {
  private el = inject(ElementRef);

  // class name to match height
  readonly appSameHeight = input<any>();

  ngAfterViewChecked() {
    // call our matchHeight function here later
    this.matchHeight(this.el.nativeElement, this.appSameHeight());
  }

  @HostListener("window:resize")
  onResize() {
    // call our matchHeight function here later
    this.matchHeight(this.el.nativeElement, this.appSameHeight());
  }

  matchHeight(parent: HTMLElement, className: string) {
    // match height logic here
    if (!parent) {
      return;
    }
    const children = parent.getElementsByClassName(className);

    if (!children) {
      return;
    }

    // reset all children height
    Array.from(children).forEach((x: Element) => {
      (<HTMLElement>x).style.height = "initial";
    });

    // gather all height
    const itemHeights = Array.from(children).map(
      (x) => x.getBoundingClientRect().height,
    );

    // find max height
    const maxHeight = itemHeights.reduce((prev, curr) => {
      return curr > prev ? curr : prev;
    }, 0);

    // apply max height
    Array.from(children).forEach(
      (x: Element) => ((<HTMLElement>x).style.height = `${maxHeight}px`),
    );
  }
}
