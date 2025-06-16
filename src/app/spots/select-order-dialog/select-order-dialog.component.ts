import { Component, OnInit, inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Order } from "@efaps/pos-library";
import { MatFabButton } from "@angular/material/button";

@Component({
    selector: "app-select-order-dialog",
    templateUrl: "./select-order-dialog.component.html",
    styleUrls: ["./select-order-dialog.component.scss"],
    imports: [MatFabButton],
})
export class SelectOrderDialogComponent implements OnInit {
  private dialogRef =
    inject<MatDialogRef<SelectOrderDialogComponent>>(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);

  orders: Order[] = [];

  ngOnInit() {
    this.orders = this.data.sort((o1: Order, o2: Order) => {
      if (o1.number! < o2.number!) {
        return -1;
      }
      if (o1.number! > o2.number!) {
        return 1;
      }
      return 0;
    });
  }

  selectOrder(order: Order) {
    this.dialogRef.close(order);
  }
}
