import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-remark-dialog',
  templateUrl: './remark-dialog.component.html',
  styleUrls: ['./remark-dialog.component.scss']
})
export class RemarkDialogComponent implements OnInit {
  remarkForm: FormGroup;

  constructor(private fb: FormBuilder,
    private matDialogRef: MatDialogRef<RemarkDialogComponent>) { }

  ngOnInit() {
    this.remarkForm = this.fb.group({
      'remark': []
    });
  }

  close() {
    this.matDialogRef.close(this.remarkForm.get('remark').value);
  }
}
