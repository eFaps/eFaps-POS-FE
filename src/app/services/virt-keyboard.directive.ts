import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output,
  inject,
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

  @Input() appVirtKeyboard!: string | undefined;

  @Input() darkTheme: boolean = false;

  @Input() duration: number = 10;

  @Input() activateKeyboard: boolean = false;

  @Output() enterClick: EventEmitter<void> = new EventEmitter<void>();

  @Output() capsClick: EventEmitter<void> = new EventEmitter<void>();

  @Output() altClick: EventEmitter<void> = new EventEmitter<void>();

  @Output() shiftClick: EventEmitter<void> = new EventEmitter<void>();

  ngOnDestroy() {
    this._hideKeyboard();
  }

  @HostListener("focus", ["$event"])
  private _showKeyboard() {
    if (this.activateKeyboard) {
      this._keyboardRef = this._keyboardService!.open(this.appVirtKeyboard, {
        darkTheme: this.darkTheme,
        duration: this.duration,
      });

      this._keyboardRef.instance.setInputInstance(this._elementRef);

      if (this._control) {
        this._keyboardRef.instance.attachControl(this._control.control!);
      }

      this._keyboardRef.instance.enterClick.subscribe(() =>
        this.enterClick.next(),
      );
      this._keyboardRef.instance.capsClick.subscribe(() =>
        this.capsClick.next(),
      );
      this._keyboardRef.instance.altClick.subscribe(() => this.altClick.next());
      this._keyboardRef.instance.shiftClick.subscribe(() =>
        this.shiftClick.next(),
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
