import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

import { OrderDialogComponent } from '../order-dialog/order-dialog.component';
import { PaymentService, PosService } from '../../services/index'

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.css']
})
export class CommandsComponent implements OnInit {

  constructor(private router: Router, private posService: PosService,
    private paymentService: PaymentService,
    private dialog: MatDialog) { }

  ngOnInit() {
  }

  order() {
    this.posService.order().subscribe(_order => {
      const dialogRef = this.dialog.open(OrderDialogComponent, {
        width: '450px',
        disableClose: true,
        data: { order: _order }
      });
      dialogRef.afterClosed().subscribe(_result => {
        this.paymentService.changeDocument(_result);
        this.router.navigate(['/payment']);
      });
    });
  }
}
