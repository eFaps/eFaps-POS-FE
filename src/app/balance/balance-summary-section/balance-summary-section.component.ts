import { Component, Input, OnInit } from '@angular/core';
import { PaymentInfo, SummaryDetail } from '@efaps/pos-library';

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
