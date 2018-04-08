import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { OrderDialogComponent } from '../order-dialog/order-dialog.component';
import { PosService } from '../../services/index'

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.css']
})
export class CommandsComponent implements OnInit {

  constructor(private posService: PosService, private dialog: MatDialog) { }

  ngOnInit() {
  }

  order() {
    this.posService.order().subscribe(_order => {
      const dialogRef = this.dialog.open(OrderDialogComponent, {
        width: '450px',
        data: { receipt: _order }
      });
    });
  }
}
