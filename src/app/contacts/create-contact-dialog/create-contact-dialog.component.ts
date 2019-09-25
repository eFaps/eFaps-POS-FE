import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { LocalStorage } from 'ngx-store';

import { IdentificationType } from '../../model/index';
import { ContactService } from '../../services/index';

@Component({
  selector: 'app-create-contact-dialog',
  templateUrl: './create-contact-dialog.component.html',
  styleUrls: ['./create-contact-dialog.component.scss']
})
export class CreateContactDialogComponent implements OnInit, OnDestroy {
  identificationType = IdentificationType;
  idTypes;
  contactForm: FormGroup;
  @LocalStorage() virtKeyboard = false;

  constructor(public dialogRef: MatDialogRef<CreateContactDialogComponent>,
    private contactService: ContactService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
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

  ngOnDestroy() {
    // event empty method is needed to allow ngx-store handle class destruction
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
      .subscribe({
        next: _contact => this.dialogRef.close(_contact),
        error: err => {
          if (err.error && err.error.status == 412) {
            this.snackBar.open("Un contacto con el mismo Numero ya existe!",
              null, { duration: 3000 });
          } else {
            this.snackBar.open("Algo inesperado paso", null, { duration: 3000 });
          }
        }
      });
  }
}
