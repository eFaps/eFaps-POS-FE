import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

import { OrderDialogComponent } from '../order-dialog/order-dialog.component';
import { PaymentService, PosService } from '../../services/index'
import { Order } from '../../model/index'

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.scss']
})
export class CommandsComponent implements OnInit {
  currentOrder: Order;

  constructor(private router: Router,
    private posService: PosService,
    private paymentService: PaymentService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.posService.currentOrder.subscribe(_order => this.currentOrder = _order);
  }

  createOrder() {
    this.posService.createOrder().subscribe(_order => {
      const order =  Object.assign({ type: 'ORDER' }, _order);
      const dialogRef = this.dialog.open(OrderDialogComponent, {
        width: '450px',
        disableClose: true,
        data: { order: order }
      });
      this.posService.reset();
      dialogRef.afterClosed().subscribe(_result => {
        if (_result) {
          this.paymentService.updateDocument(_result);
          this.router.navigate(['/payment']);
        }
      });
    });
  }

  hasOrder(): boolean {
    return (this.currentOrder) ? true : false;
  }

  updateOrder() {
      this.posService.updateOrder(this.currentOrder).subscribe(_order => {
        const order =  Object.assign({ type: 'ORDER' }, _order);
        const dialogRef = this.dialog.open(OrderDialogComponent, {
          width: '450px',
          disableClose: true,
          data: { order: order }
        });
        this.posService.reset();
        dialogRef.afterClosed().subscribe(_result => {
          if (_result) {
            this.paymentService.updateDocument(_result);
            this.router.navigate(['/payment']);
          }
        });
      });
  }
}
