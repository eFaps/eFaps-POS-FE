import { Component, OnInit, effect, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Currency, PosService, PromoInfo, PosLibraryModule } from "@efaps/pos-library";
import { PromoDialogComponent } from "src/app/shared/promo-dialog/promo-dialog.component";
import { MatList, MatListItem } from "@angular/material/list";
import { MatButton } from "@angular/material/button";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
    selector: "app-totals",
    templateUrl: "./totals.component.html",
    styleUrls: ["./totals.component.scss"],
    imports: [
        MatList,
        MatListItem,
        MatButton,
        PosLibraryModule,
        TranslatePipe,
    ],
})
export class TotalsComponent implements OnInit {
  private dialog = inject(MatDialog);
  private posService = inject(PosService);

  net: number = 0;
  taxesEntries: [string, number][] = [];
  cross: number = 0;
  payableAmount: number = 0;
  totalDiscount: number = 0;
  currentCurrency: Currency = Currency.PEN;
  promoInfo: PromoInfo | null = null;

  constructor() {
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
