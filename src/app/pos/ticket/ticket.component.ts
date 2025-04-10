import {
  Component,
  effect,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import {
  Currency,
  isChildItem,
  Item,
  PosService,
  PromoInfo,
} from "@efaps/pos-library";
import { Decimal } from "decimal.js";
import { PromoDialogComponent } from "src/app/shared/promo-dialog/promo-dialog.component";

@Component({
    selector: "app-ticket",
    templateUrl: "./ticket.component.html",
    styleUrls: ["./ticket.component.scss"],
    standalone: false
})
export class TicketComponent implements OnInit {
  displayedColumns = [
    "quantity",
    "childQuantity",
    "productDesc",
    "unitPrice",
    "discount",
    "price",
    "modify",
  ];
  dataSource = new MatTableDataSource<Item>();
  currentCurrency: Currency = Currency.PEN;
  multiplier = 0;
  promoInfo: PromoInfo | null = null;

  @Input() isBarcode: boolean = false;
  @Output() multiplierClick = new EventEmitter<any>();

  constructor(
    private posService: PosService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {
    effect(() => {
      this.displayedColumns = this.displayedColumns.filter(
        (name) => "discount" != name,
      );
      this.promoInfo = this.posService.promotionInfo();
      if (this.promoInfo != null) {
        this.displayedColumns.splice(4, 0, "discount");
      }
    });
  }

  ngOnInit() {
    this.posService.currentTicket.subscribe(
      (_data) => (this.dataSource.data = _data),
    );
    this.posService.currentCurrency.subscribe(
      (_data) => (this.currentCurrency = _data),
    );
    this.posService.multiplier.subscribe({
      next: (multiplier) => (this.multiplier = multiplier),
    });
  }

  add(item: Item) {
    if (!this.isBarcode) {
      item.quantity = new Decimal(item.quantity)
        .plus(this.getQuantity())
        .toNumber();
      this.dataSource.data
        .filter((entry) => entry.parentIdx == item.index)
        .forEach((childItem) => {
          childItem.quantity = new Decimal(childItem.quantity)
            .plus(this.getQuantity())
            .toNumber();
        });

      this.syncTicket();
      this.multiplierClick.emit();
    }
  }

  subtract(item: Item) {
    if (!this.isBarcode) {
      item.quantity = new Decimal(item.quantity)
        .minus(this.getQuantity())
        .toNumber();
      if (item.quantity < 1) {
        const ticket = this.dataSource.data;
        if (ticket.includes(item)) {
          const index = ticket.indexOf(item);
          if (index > -1) {
            ticket[ticket.indexOf(item)].quantity = 1;
            ticket.splice(index, 1);
          }
        }
        const childItems = ticket.filter(
          (entry) => entry.parentIdx == item.index,
        );
        childItems.forEach((childItem) => {
          const index = ticket.indexOf(childItem);
          if (index > -1) {
            ticket[ticket.indexOf(childItem)].quantity = 1;
            ticket.splice(index, 1);
          }
        });
      } else {
        this.dataSource.data
          .filter((entry) => entry.parentIdx == item.index)
          .forEach((childItem) => {
            childItem.quantity = new Decimal(childItem.quantity)
              .minus(this.getQuantity())
              .toNumber();
          });
      }
      let currentId = 1;
      let currentParent = 1;
      this.dataSource.data.forEach((entry) => {
        entry.index = currentId;
        if (entry.parentIdx) {
          entry.parentIdx = currentParent;
        } else {
          currentParent = currentId;
        }
        currentId++;
      });
      this.syncTicket();
      this.multiplierClick.emit();
    }
  }

  syncTicket() {
    this.posService.changeTicket(this.dataSource.data);
  }

  private getQuantity(): Decimal {
    return new Decimal(this.multiplier > 0 ? this.multiplier : 1);
  }

  showRemark(remark: string) {
    this.snackBar.open(remark, undefined, { duration: 3000 });
  }

  isChild(item: Item) {
    return isChildItem(item);
  }

  getDiscount(index: number): number {
    if (this.promoInfo != null && this.promoInfo.details.length > index) {
      return this.promoInfo.details[index].crossUnitDiscount;
    }
    return 0;
  }

  showPromoInfo(index: number) {
    this.dialog.open(PromoDialogComponent, {
      data: {
        promoInfo: this.promoInfo,
        selectedDetail: index,
      },
    });
  }
}
