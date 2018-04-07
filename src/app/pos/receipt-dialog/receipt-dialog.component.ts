import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-receipt-dialog',
  templateUrl: './receipt-dialog.component.html',
  styleUrls: ['./receipt-dialog.component.css']
})
export class ReceiptDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ReceiptDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit() {
  }

}
