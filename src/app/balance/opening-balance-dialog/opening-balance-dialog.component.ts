import { CdkScrollable } from "@angular/cdk/scrolling";
import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormRecord,
  ReactiveFormsModule,
} from "@angular/forms";
import { MatButton } from "@angular/material/button";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
} from "@angular/material/dialog";
import { MatFormField } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { Currency } from "@efaps/pos-library";
import { EnumValues } from "enum-values";

@Component({
  selector: "app-opening-balance-dialog",
  templateUrl: "./opening-balance-dialog.component.html",
  styleUrls: ["./opening-balance-dialog.component.scss"],
  imports: [
    CdkScrollable,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatDialogActions,
    MatButton,
    MatDialogClose,
  ],
})
export class OpeningBalanceDialogComponent implements OnInit {
  openingForm: FormGroup;
  currencies: string[];

  constructor() {
    this.openingForm = new FormRecord<FormControl<number>>({});
    this.currencies = EnumValues.getNames(Currency);
    for (let cur of this.currencies) {
      this.openingForm.addControl(cur, new FormControl());
    }
  }
  ngOnInit(): void {}
}
