import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-create-contact-dialog',
  templateUrl: './create-contact-dialog.component.html',
  styleUrls: ['./create-contact-dialog.component.scss']
})
export class CreateContactDialogComponent implements OnInit {
  contactForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<CreateContactDialogComponent>,
      private fb: FormBuilder,
      @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
      this.contactForm = this.fb.group({
        taxNumber: ['', [Validators.required, Validators.pattern('[0-9]{11}')]],
        name: ['', Validators.required],
      });
  }

}
