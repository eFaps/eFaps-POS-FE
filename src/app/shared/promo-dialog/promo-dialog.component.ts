import { Component, Inject } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatListModule } from "@angular/material/list";
import { PromoInfo, Promotion, PromotionService } from "@efaps/pos-library";

@Component({
  selector: "app-promo-dialog",
  standalone: true,
  imports: [MatDialogModule, MatListModule],
  templateUrl: "./promo-dialog.component.html",
  styleUrl: "./promo-dialog.component.scss",
})
export class PromoDialogComponent {
  promoInfo: PromoInfo;
  selectedDetail: number | undefined;
  detailPromotions: Promotion[] = [];
  docPromotions: Promotion[] = [];

  constructor(
    private promotionService: PromotionService,
    public dialogRef: MatDialogRef<PromoDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      promoInfo: PromoInfo;
      selectedDetail: number | undefined;
    }
  ) {
    this.promoInfo = data.promoInfo;
    this.selectedDetail = data.selectedDetail;
    this.loadPromotions();
  }

  private loadPromotions() {
    if (
      this.selectedDetail != null &&
      this.promoInfo.details.length > this.selectedDetail
    ) {
      var promotionOid =
        this.promoInfo.details[this.selectedDetail].promotionOid;
      this.promotionService.getPromotion(promotionOid).subscribe({
        next: (promotion) => {
          this.detailPromotions.push(promotion);
        },
      });
    } else {
      this.promoInfo.promotionOids.forEach((oid) => {
        this.promotionService.getPromotion(promotionOid).subscribe({
          next: (promotion) => {
            this.docPromotions.push(promotion);
          },
        });
      });
      this.promoInfo.details.forEach((detail) => {
        this.promotionService.getPromotion(detail.promotionOid).subscribe({
          next: (promotion) => {
            this.detailPromotions.push(promotion);
          },
        });
      });
    }
  }
  get title(): string {
    return this.detailPromotions
      .map((promo) => {
        promo.name;
      })
      .join(",");
  }
}
