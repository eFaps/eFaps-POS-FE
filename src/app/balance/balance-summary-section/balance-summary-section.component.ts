import { Component, Input, OnInit } from "@angular/core";
import {
  PaymentInfo,
  PosLibraryModule,
  SummaryDetail,
} from "@efaps/pos-library";

@Component({
  selector: "app-balance-summary-section",
  templateUrl: "./balance-summary-section.component.html",
  styleUrls: ["./balance-summary-section.component.scss"],
  imports: [PosLibraryModule],
})
export class BalanceSummarySectionComponent implements OnInit {
  _detail: SummaryDetail = {
    documentCount: 0,
    paymentCount: 0,
    netTotals: [],
    crossTotals: [],
    paymentInfos: [],
    taxEntries: [],
  };
  infos: PaymentInfo[] = [];
  constructor() {}

  ngOnInit() {}

  @Input()
  set detail(detail: SummaryDetail) {
    detail.paymentInfos.sort((info1, info2) => {
      if (info1.type == info2.type) {
        return info1.label > info2.label ? 1 : -1;
      }
      return info1.type > info2.type ? 1 : -1;
    });
    this._detail = detail;
  }

  get detail() {
    return this._detail;
  }
}
