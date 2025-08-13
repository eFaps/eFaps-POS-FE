import { CdkScrollable } from "@angular/cdk/scrolling";
import { HttpContext } from "@angular/common/http";
import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatOption } from "@angular/material/autocomplete";
import { MatButton } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatSelect } from "@angular/material/select";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  ConfigService,
  Contact,
  ContactService,
  DNI,
  IGNORED_STATUSES,
  IdentificationType,
  RUC,
} from "@efaps/pos-library";
import { TranslatePipe } from "@ngx-translate/core";
import { EnumValues } from "enum-values";

import { DNIQueryComponent } from "../../shared/dniquery/dniquery.component";
import { TaxpayerQueryComponent } from "../../shared/taxpayer-query/taxpayer-query.component";
import { CONTACT_ACTIVATE_EMAIL } from "../../util/keys";

@Component({
  selector: "app-create-contact-dialog",
  templateUrl: "./create-contact-dialog.component.html",
  styleUrls: ["./create-contact-dialog.component.scss"],
  imports: [
    MatDialogTitle,
    CdkScrollable,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    DNIQueryComponent,
    TaxpayerQueryComponent,
    MatLabel,
    MatInput,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    TranslatePipe,
  ],
})
export class CreateContactDialogComponent implements OnInit, OnDestroy {
  dialogRef = inject<MatDialogRef<CreateContactDialogComponent>>(MatDialogRef);
  private configService = inject(ConfigService);
  private contactService = inject(ContactService);
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  data = inject(MAT_DIALOG_DATA);

  identificationType = IdentificationType;
  idTypes: IdentificationType[] = [];
  contactForm: FormGroup;
  //@LocalStorage() virtKeyboard = false;
  useEmail: boolean = false;

  constructor() {
    this.idTypes = EnumValues.getValues(IdentificationType);
    this.contactForm = this.fb.group({
      idType: ["", [Validators.required]],
      idNumber: ["", [Validators.required]],
      name: ["", Validators.required],
      email: ["", Validators.email],
    });
  }

  ngOnInit() {
    this.configService
      .getSystemConfig<boolean>(CONTACT_ACTIVATE_EMAIL)
      .subscribe({
        next: (value) => {
          this.useEmail = value;
        },
      });

    this.contactForm.get("idType")!.valueChanges.subscribe((idType) => {
      if (idType === IdentificationType.RUC) {
        this.contactForm
          .get("idNumber")!
          .setValidators([
            Validators.required,
            Validators.pattern("[0-9]{11}"),
          ]);
      } else if (idType === IdentificationType.DNI) {
        this.contactForm
          .get("idNumber")!
          .setValidators([Validators.required, Validators.pattern("[0-9]{8}")]);
      } else if (idType === IdentificationType.CE) {
        this.contactForm
          .get("idNumber")!
          .setValidators([Validators.required, Validators.pattern("[0-9]{9}")]);
      } else {
        this.contactForm.get("idNumber")!.setValidators([Validators.required]);
      }
      this.contactForm.get("idNumber")!.updateValueAndValidity();
    });
  }

  ngOnDestroy() {
    // event empty method is needed to allow ngx-store handle class destruction
  }

  submit() {
    const contact: Contact = {
      id: null,
      oid: null,
      name: this.contactForm.value.name,
      idType:
        IdentificationType[
          this.contactForm.value.idType as keyof typeof IdentificationType
        ],
      idNumber: this.contactForm.value.idNumber,
      email: this.contactForm.value.email,
    };
    this.contactService
      .createContact(contact, {
        context: new HttpContext().set(IGNORED_STATUSES, [412]),
      })
      .subscribe({
        next: (contact: any) => this.dialogRef.close(contact),
        error: (err: any) => {
          if (err && err.status == 412) {
            this.snackBar.open(
              "Un contacto con el mismo Numero ya existe!",
              undefined,
              { duration: 3000 },
            );
          } else {
            this.snackBar.open("Algo inesperado paso", undefined, {
              duration: 3000,
            });
          }
        },
      });
  }

  onTaxpayerQuery(taxpayer: RUC) {
    if (taxpayer) {
      this.contactForm.patchValue({
        idNumber: taxpayer.number,
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
        this.snackBar.open(msg, undefined, { duration: 3000 });
      }
    } else {
      const msg = (<any>(
        $localize
      ))`:@@taxpayerQuery-empty:No results for the given ID`;
      this.snackBar.open(msg, undefined, { duration: 3000 });
    }
  }

  onDNIQuery(dni: DNI) {
    if (dni) {
      this.contactForm.patchValue({
        idNumber: dni.number,
        name: dni.fullName,
      });
    }
  }

  get showTaxpayerQuery() {
    return this.contactForm.value.idType == IdentificationType.RUC;
  }

  get showDNIQuery() {
    return this.contactForm.value.idType == IdentificationType.DNI;
  }
}
