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
    this.move(_item, origin, target);
    this.originDataSource.data = origin;
    this.targetDataSource.data = target;
  }

  moveToOrigin(_item: DocItem) {
    const origin = this.originDataSource.data;
    const target = this.targetDataSource.data;
    this.move(_item, target, origin);
    this.originDataSource.data = origin;
    this.targetDataSource.data = target;
  }

  move(_item: DocItem, _origin: DocItem[], _target: DocItem[]) {
    const targetItem = _target.find(item => item.index === _item.index);
    if (targetItem) {
      targetItem.quantity = targetItem.quantity + 1;
      if (_item.quantity === 1) {
        const index: number = _origin.indexOf(_item);
        if (index !== -1) {
          _origin.splice(index, 1);
        }
      } else {
        _item.quantity = _item.quantity - 1;
      }
    } else {
      if (_item.quantity === 1) {
        const index: number = _origin.indexOf(_item);
        if (index !== -1) {
          _origin.splice(index, 1);
          _target.push(_item);
        }
      } else {
        _item.quantity = _item.quantity - 1;
        _target.push({
          index: _item.index,
          product: _item.product,
          quantity: 1,
          netPrice: _item.netPrice,
          netUnitPrice: _item.netUnitPrice,
          crossPrice: _item.crossPrice,
          crossUnitPrice: _item.crossUnitPrice,
          taxes: _item.taxes
        });
      }
    }
    _origin.sort((a, b) => (a.index < b.index ? -1 : 1));
    _target.sort((a, b) => (a.index < b.index ? -1 : 1));
  }
}
