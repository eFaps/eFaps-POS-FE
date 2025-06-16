import {
  Directive,
  ElementRef,
  HostListener,
  OnDestroy,
  inject,
  input,
  output
} from "@angular/core";
import { NgControl } from "@angular/forms";
import {
  MatKeyboardComponent,
  MatKeyboardRef,
  MatKeyboardService,
} from "@efaps/angular-onscreen-material-keyboard";

@Directive({ 
  selector: "input[appVirtKeyboard], textarea[appVirtKeyboard]", 
  standalone: true,
  providers: [MatKeyboardService]
})
export class VirtKeyboardDirective implements OnDestroy {
  private _elementRef = inject(ElementRef);
  private _keyboardService = inject(MatKeyboardService);
  private _control = inject(NgControl, { optional: true, self: true });

  private _keyboardRef!: MatKeyboardRef<MatKeyboardComponent>;

  readonly appVirtKeyboard = input.required<string | undefined>();

  readonly darkTheme = input<boolean>(false);

  readonly duration = input<number>(10);

  readonly activateKeyboard = input<boolean>(false);

  readonly enterClick = output<void>();

  readonly capsClick = output<void>();

  readonly altClick = output<void>();

  readonly shiftClick = output<void>();

  ngOnDestroy() {
    this._hideKeyboard();
  }

  @HostListener("focus", ["$event"])
  private _showKeyboard() {
    if (this.activateKeyboard()) {
      this._keyboardRef = this._keyboardService!.open(this.appVirtKeyboard(), {
        darkTheme: this.darkTheme(),
        duration: this.duration(),
      });

      this._keyboardRef.instance.setInputInstance(this._elementRef);

      if (this._control) {
        this._keyboardRef.instance.attachControl(this._control.control!);
      }

      this._keyboardRef.instance.enterClick.subscribe(() =>
        this.enterClick.emit(),
      );
      this._keyboardRef.instance.capsClick.subscribe(() =>
        this.capsClick.emit(),
      );
      this._keyboardRef.instance.altClick.subscribe(() => this.altClick.emit());
      this._keyboardRef.instance.shiftClick.subscribe(() =>
        this.shiftClick.emit(),
      );
    }
  }

  @HostListener("blur", ["$event"])
  private _hideKeyboard() {
    if (this._keyboardRef) {
      this._keyboardRef.dismiss();
    }
  }
}
