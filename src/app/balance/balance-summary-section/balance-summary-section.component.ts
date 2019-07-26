import { Component, OnInit, Input } from '@angular/core';
import { SummaryDetail, PaymentInfo } from '../../model';

@Component({
  selector: 'app-balance-summary-section',
  templateUrl: './balance-summary-section.component.html',
  styleUrls: ['./balance-summary-section.component.scss']
})
export class BalanceSummarySectionComponent implements OnInit {
  @Input() detail: SummaryDetail;
  infos: PaymentInfo[];
  constructor() { }

  ngOnInit() {
  }
}
