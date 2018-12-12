import { Directive, ViewContainerRef, Input } from '@angular/core';

@Directive({
  selector: '[appPaymentType]'
})
export class PaymentTypeDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
