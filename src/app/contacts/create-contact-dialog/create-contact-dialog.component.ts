import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { LocalStorage } from 'ngx-store';

import { Contact, IdentificationType } from '../../model/index';
import { ContactService } from '../../services/index';

@Component({
  selector: 'app-create-contact-dialog',
  templateUrl: './create-contact-dialog.component.html',
  styleUrls: ['./create-contact-dialog.component.scss']
})
export class CreateContactDialogComponent implements OnInit {
  identificationType = IdentificationType;
  idTypes;
  contactForm: FormGroup;
  @LocalStorage() virtKeyboard = false;

  constructor(public dialogRef: MatDialogRef<CreateContactDialogComponent>,
    private contactService: ContactService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.idTypes = Object.keys(this.identificationType).filter(f => !isNaN(Number(f)));
  }

  ngOnInit() {
    this.contactForm = this.fb.group({
      idType: ['', [Validators.required]],
      idNumber: ['', [Validators.required]],
      name: ['', Validators.required],
    });
    this.contactForm.get('idType').valueChanges.subscribe(
      (idType) => {
        if (Number(idType) === IdentificationType.RUC) {
          this.contactForm.get('idNumber').setValidators([Validators.required, Validators.pattern('[0-9]{11}')]);
        } else if (Number(idType) === IdentificationType.DNI) {
          this.contactForm.get('idNumber').setValidators([Validators.required, Validators.pattern('[0-9]{8}')]);
        } else if (Number(idType) === IdentificationType.CE) {
          this.contactForm.get('idNumber').setValidators([Validators.required, Validators.pattern('[0-9]{9}')]);
        } else {
          this.contactForm.get('idNumber').setValidators([Validators.required]);
        }
        this.contactForm.get('idNumber').updateValueAndValidity();
      }
    );
  }

  submit() {
    console.log(this.contactForm);
    const contact = {
      id: null,
      oid: null,
      name: this.contactForm.value.name,
      idType: IdentificationType[IdentificationType[this.contactForm.value.idType]],
      idNumber: this.contactForm.value.idNumber,
    };
    this.contactService.createContact(contact)
      .subscribe(_contact => this.dialogRef.close(_contact));
  }
}
