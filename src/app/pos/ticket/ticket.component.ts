import {
  Component,
  effect,
  EventEmitter,
  inject,
  OnInit,
  Output,
  input
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from "@angular/material/table";
import { Currency, isChildItem, Item, PosService, PromoInfo, PosLibraryModule } from "@efaps/pos-library";
import { Decimal } from "decimal.js";
import { PromoDialogComponent } from "src/app/shared/promo-dialog/promo-dialog.component";
import { MatIconButton, MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { PartListRelationComponent } from "../../shared/part-list-relation/part-list-relation.component";

@Component({
    selector: "app-ticket",
    templateUrl: "./ticket.component.html",
    styleUrls: ["./ticket.component.scss"],
    imports: [
        MatTable,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        MatCellDef,
        MatCell,
        MatIconButton,
        MatIcon,
        MatButton,
        PartListRelationComponent,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        PosLibraryModule,
    ],
})
export class TicketComponent implements OnInit {
  private posService = inject(PosService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

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

  readonly isBarcode = input<boolean>(false);
  @Output() multiplierClick = new EventEmitter<any>();

  constructor() {
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
      (data) => (this.dataSource.data = data),
    );
    this.posService.currentCurrency.subscribe(
      (data) => (this.currentCurrency = data),
    );
    this.posService.multiplier.subscribe({
      next: (multiplier) => (this.multiplier = multiplier),
    });
  }

  add(item: Item) {
    if (!this.isBarcode()) {
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
    if (!this.isBarcode()) {
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
