import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

import { Order } from '../../model/index';
import { PaymentService, PosService, PrintService, WorkspaceService } from '../../services/index';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';

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
    private workspaceService: WorkspaceService,
    private dialog: MatDialog,
    private el: ElementRef) { }

  ngOnInit() {
    this.posService.currentOrder.subscribe(_order => this.currentOrder = _order);
  }

  hasOrder(): boolean {
    return (this.currentOrder) ? true : false;
  }

  createOrder() {
    this.posService.createOrder().subscribe(_order => { this.onUpdate(_order); });
  }

  updateOrder() {
    this.posService.updateOrder(this.currentOrder).subscribe(_order => { this.onUpdate(_order); });
  }

  onUpdate(_order: Order) {
      const order = Object.assign({ type: 'ORDER' }, _order);
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
        } else {
            if (this.workspaceService.showSpots()) {
                this.router.navigate(['/spots']);
            }
        }
      });
  }

  isSticky() {
    return this.el.nativeElement.offsetTop - window.innerHeight + 100 > 0;
  }
}
