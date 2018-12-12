import { Component, OnInit, Input, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { PaymentTypeItem } from '../payment-type-item';
import { PaymentTypeDirective } from '../payment-type.directive';

@Component({
  selector: 'app-payment-type-container',
  templateUrl: './payment-type-container.component.html',
  styleUrls: ['./payment-type-container.component.scss']
})
export class PaymentTypeContainerComponent implements OnInit {
  @Input() item: PaymentTypeItem;
  @Input() change: number;
  @ViewChild(PaymentTypeDirective) paymentType: PaymentTypeDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.item.component);
    let viewContainerRef = this.paymentType.viewContainerRef;
    viewContainerRef.clear();
    let componentRef = viewContainerRef.createComponent(componentFactory);
    componentRef.instance.change = this.change;
  }
}
