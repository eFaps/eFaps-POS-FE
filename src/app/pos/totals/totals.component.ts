import { Component, OnInit, effect } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Currency, PosService, PromoInfo } from "@efaps/pos-library";
import { PromoDialogComponent } from "src/app/shared/promo-dialog/promo-dialog.component";

@Component({
    selector: "app-totals",
    templateUrl: "./totals.component.html",
    styleUrls: ["./totals.component.scss"],
    standalone: false
})
export class TotalsComponent implements OnInit {
  net: number = 0;
  taxesEntries: [string, number][] = [];
  cross: number = 0;
  payableAmount: number = 0;
  totalDiscount: number = 0;
  currentCurrency: Currency = Currency.PEN;
  promoInfo: PromoInfo | null = null;

  constructor(
    private dialog: MatDialog,
    private posService: PosService,
  ) {
    effect(() => {
      this.promoInfo = this.posService.promotionInfo();
      if (this.promoInfo != null) {
        this.totalDiscount = this.promoInfo.crossTotalDiscount;
      } else {
        this.totalDiscount = 0;
      }
    });
  }

  ngOnInit() {
    this.posService.currentCurrency.subscribe(
      (_data) => (this.currentCurrency = _data),
    );
    this.posService.currentNetTotal.subscribe((_data) => (this.net = _data));
    this.posService.currentTaxes.subscribe((_data) => {
      this.taxesEntries = Array.from(_data.entries());
    });
    this.posService.currentCrossTotal.subscribe(
      (_data) => (this.cross = _data),
    );
    this.posService.currentPayableAmount.subscribe(
      (_data) => (this.payableAmount = _data),
    );
  }

  showPromoInfo() {
    this.dialog.open(PromoDialogComponent, {
      data: { promoInfo: this.promoInfo },
    });
  }
}
