import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Order } from '../../model';

@Component({
  selector: 'app-select-order-dialog',
  templateUrl: './select-order-dialog.component.html',
  styleUrls: ['./select-order-dialog.component.scss']
})
export class SelectOrderDialogComponent implements OnInit {
  orders: Order[] = [];

  constructor(private dialogRef: MatDialogRef<SelectOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.orders = this.data;
  }

  selectOrder(order: Order) {
    this.dialogRef.close(order);
  }
}
