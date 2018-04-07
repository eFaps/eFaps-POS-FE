import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { ReceiptDialogComponent } from '../receipt-dialog/receipt-dialog.component';
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

  register() {
    this.posService.register().subscribe(_receipt => {
      const dialogRef = this.dialog.open(ReceiptDialogComponent, {
        width: '450px',
        data: { receipt: _receipt }
      });
    });
  }
}
