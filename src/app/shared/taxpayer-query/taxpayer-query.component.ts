import { Component, inject, output } from "@angular/core";
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatFormField } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatSlideToggle } from "@angular/material/slide-toggle";
import { EnquiryService, RUC } from "@efaps/pos-library";

import { TaxpayerResultComponent } from "../taxpayer-result/taxpayer-result.component";

@Component({
  selector: "app-taxpayer-query",
  templateUrl: "./taxpayer-query.component.html",
  styleUrls: ["./taxpayer-query.component.scss"],
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatSlideToggle,
  ],
})
export class TaxpayerQueryComponent {
  private fb = inject(NonNullableFormBuilder);
  private enquiryService = inject(EnquiryService);
  private dialog = inject(MatDialog);

  taxpayerForm: FormGroup;
  nameSearch = false;
  readonly result = output<RUC>();

  constructor() {
    this.taxpayerForm = this.fb.group({
      term: ["", [Validators.required, Validators.pattern("[0-9]{11}")]],
    });
  }

  setNameSearch() {
    this.nameSearch = !this.nameSearch;
    if (this.nameSearch) {
      this.taxpayerForm
        .get("term")!
        .setValidators([Validators.required, Validators.minLength(2)]);
    } else {
      this.taxpayerForm
        .get("term")!
        .setValidators([Validators.required, Validators.pattern("[0-9]{11}")]);
    }
  }

  query() {
    if (this.nameSearch) {
      const dialogRef = this.dialog.open(TaxpayerResultComponent, {
        data: this.taxpayerForm.value.term,
        maxHeight: "95vh",
      });
      dialogRef.afterClosed().subscribe({
        next: (taxpayer) => {
          this.result.emit(taxpayer);
        },
      });
    } else {
      this.enquiryService.getRUC(this.taxpayerForm.value.term).subscribe({
        next: (taxpayer) => {
          this.result.emit(taxpayer);
        },
      });
    }
  }
}
