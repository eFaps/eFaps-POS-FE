import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';
import { Order, DocItem } from '../../model';

@Component({
  selector: 'app-split-order-dialog',
  templateUrl: './split-order-dialog.component.html',
  styleUrls: ['./split-order-dialog.component.scss']
})
export class SplitOrderDialogComponent implements OnInit {

  originDataSource = new MatTableDataSource<DocItem>();
  targetDataSource = new MatTableDataSource<DocItem>();
  originColumns = ['index', 'quantity', 'productDesc', 'crossUnitPrice', 'crossPrice', 'cmd'];
  targetColumns = ['cmd', 'index', 'quantity', 'productDesc', 'crossUnitPrice', 'crossPrice'];

  constructor(public dialogRef: MatDialogRef<SplitOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.originDataSource.data = this.data.items.sort((a, b) => (a.index < b.index ? -1 : 1));
  }

  moveToTarget(_item: DocItem) {
    const origin = this.originDataSource.data;
    const target = this.targetDataSource.data;
    const index: number = origin.indexOf(_item);
    if (index !== -1) {
      origin.splice(index, 1);
      this.originDataSource.data = origin;
      target.push(_item);
      this.targetDataSource.data = target;
    }
  }

  moveToOrigin(_item: DocItem) {
    const origin = this.originDataSource.data;
    const target = this.targetDataSource.data;
    const index: number = target.indexOf(_item);
    if (index !== -1) {
      target.splice(index, 1);
      this.targetDataSource.data = target;
      origin.push(_item);
      this.originDataSource.data = origin;
    }
  }
}
