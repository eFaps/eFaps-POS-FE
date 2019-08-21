import { Component, OnInit, OnDestroy } from '@angular/core';
import { CollectService } from '../../services';
import { Collector } from '../../model/collector';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-payment-type',
  templateUrl: './payment-type.component.html',
  styleUrls: ['./payment-type.component.scss']
})
export class PaymentTypeComponent implements OnInit, OnDestroy {
  collectors: Collector[] = [];
  private subscription$ = new Subscription();

  constructor(private collectService: CollectService) { }

  ngOnInit() {
    this.subscription$.add(this.collectService.getCollectors().subscribe({
      next: collectors => this.collectors = collectors
    }))
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  get auto() {
    return this.collectors.length > 0;
  }
}
