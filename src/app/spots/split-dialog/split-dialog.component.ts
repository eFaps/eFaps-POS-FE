import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-split-dialog',
  templateUrl: './split-dialog.component.html',
  styleUrls: ['./split-dialog.component.scss']
})
export class SplitDialogComponent implements OnInit {
  quantityForm: FormGroup;
  quantity: number;

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<SplitDialogComponent>) { }

  ngOnInit() {
    this.quantityForm = this.fb.group({
      'quantity': [''],
    });
  }

  setQuantity(_number: string) {
    let multi;
    switch (_number) {
      case 'clear':
        multi = '';
        break;
      default:
        multi = '' + this.quantityForm.value.quantity + _number;
        break;
    }
    this.quantityForm.patchValue({ 'quantity': multi });
    this.quantity = Number(multi);
  }

  split() {
    this.dialogRef.close(this.quantity);
  }
}
