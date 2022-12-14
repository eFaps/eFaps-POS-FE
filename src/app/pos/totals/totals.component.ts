import { Component, OnInit } from "@angular/core";
import { Currency, PosService } from "@efaps/pos-library";

@Component({
  selector: "app-totals",
  templateUrl: "./totals.component.html",
  styleUrls: ["./totals.component.scss"],
})
export class TotalsComponent implements OnInit {
  net: number = 0;
  taxesEntries: [string, number][] = [];
  cross: number = 0;
  payableAmount: number = 0;
  currentCurrency: Currency = Currency.PEN;

  constructor(private posService: PosService) {}

  ngOnInit() {
    this.posService.currentCurrency.subscribe(
      (_data) => (this.currentCurrency = _data)
    );
    this.posService.currentNetTotal.subscribe((_data) => (this.net = _data));
    this.posService.currentTaxes.subscribe((_data) => {
      this.taxesEntries = Array.from(_data.entries());
    });
    this.posService.currentCrossTotal.subscribe(
      (_data) => (this.cross = _data)
    );
    this.posService.currentPayableAmount.subscribe(
      (_data) => (this.payableAmount = _data)
    );
  }
}
