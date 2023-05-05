import { Component, Inject, OnInit } from "@angular/core";
import {
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
  MatLegacyDialogRef as MatDialogRef,
} from "@angular/material/legacy-dialog";
import { Order } from "@efaps/pos-library";

@Component({
  selector: "app-select-order-dialog",
  templateUrl: "./select-order-dialog.component.html",
  styleUrls: ["./select-order-dialog.component.scss"],
})
export class SelectOrderDialogComponent implements OnInit {
  orders: Order[] = [];

  constructor(
    private dialogRef: MatDialogRef<SelectOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

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
