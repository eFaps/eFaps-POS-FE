import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { LocalStorage } from "@efaps/ngx-store";
import {
  ConfigService,
  ContactService,
  IdentificationType,
  Taxpayer,
} from "@efaps/pos-library";

import { CONTACT_ACTIVATE_EMAIL } from "../../util/keys";

@Component({
  selector: "app-create-contact-dialog",
  templateUrl: "./create-contact-dialog.component.html",
  styleUrls: ["./create-contact-dialog.component.scss"],
})
export class CreateContactDialogComponent implements OnInit, OnDestroy {
  identificationType = IdentificationType;
  idTypes: string[] = [];
  contactForm: FormGroup;
  @LocalStorage() virtKeyboard = false;
  useEmail: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CreateContactDialogComponent>,
    private configService: ConfigService,
    private contactService: ContactService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.idTypes = Object.keys(this.identificationType);
  }

  ngOnInit() {
    this.configService.getSystemConfig(CONTACT_ACTIVATE_EMAIL).subscribe({
      next: (value) => {
        this.useEmail = "true" === "" + value;
      },
    });

    this.contactForm = this.fb.group({
      idType: ["-1", [Validators.required]],
      idNumber: ["", [Validators.required]],
      name: ["", Validators.required],
      email: ["", Validators.email],
    });
    this.contactForm.get("idType").valueChanges.subscribe((idType) => {
      if (idType === IdentificationType.RUC) {
        this.contactForm
          .get("idNumber")
          .setValidators([
            Validators.required,
            Validators.pattern("[0-9]{11}"),
          ]);
      } else if (idType === IdentificationType.DNI) {
        this.contactForm
          .get("idNumber")
          .setValidators([Validators.required, Validators.pattern("[0-9]{8}")]);
      } else if (idType === IdentificationType.CE) {
        this.contactForm
          .get("idNumber")
          .setValidators([Validators.required, Validators.pattern("[0-9]{9}")]);
      } else {
        this.contactForm.get("idNumber").setValidators([Validators.required]);
      }
      this.contactForm.get("idNumber").updateValueAndValidity();
    });
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
      idType:
        IdentificationType[IdentificationType[this.contactForm.value.idType]],
      idNumber: this.contactForm.value.idNumber,
      email: this.contactForm.value.email,
    };
    this.contactService.createContact(contact).subscribe({
      next: (_contact) => this.dialogRef.close(_contact),
      error: (err) => {
        if (err.error && err.error.status == 412) {
          this.snackBar.open(
            "Un contacto con el mismo Numero ya existe!",
            null,
            { duration: 3000 }
          );
        } else {
          this.snackBar.open("Algo inesperado paso", null, { duration: 3000 });
        }
      },
    });
  }

  onTaxpayerQuery(taxpayer: Taxpayer) {
    if (taxpayer) {
      this.contactForm.patchValue({
        idNumber: taxpayer.id,
        name: taxpayer.name,
      });
      let msg = "";
      if (taxpayer.homeState != "HABIDO") {
        msg = `Condición del Contribuyente: ${taxpayer.homeState}`;
      }
      if (taxpayer.state != "ACTIVO") {
        if (msg.length > 0) {
          msg = `${msg} -- `;
        }
        msg = `${msg}Estado del Contribuyente: ${taxpayer.state}`;
      }
      if (msg.length > 0) {
        this.snackBar.open(msg, null, { duration: 3000 });
      }
    } else {
      const msg = (<any>(
        $localize
      ))`:@@taxpayerQuery-empty:No results for the given ID`;
      this.snackBar.open(msg, null, { duration: 3000 });
    }
  }

  get showTaxpayerQuery() {
    return this.contactForm.value.idType == IdentificationType.RUC;
  }
}
