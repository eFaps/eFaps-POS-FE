import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormRecord,
} from "@angular/forms";
import { Currency } from "@efaps/pos-library";
import { EnumValues } from "enum-values";

@Component({
  selector: "app-opening-balance-dialog",
  templateUrl: "./opening-balance-dialog.component.html",
  styleUrls: ["./opening-balance-dialog.component.scss"],
})
export class OpeningBalanceDialogComponent implements OnInit {
  openingForm: FormGroup;
  currencies: string[];

  constructor(fb: FormBuilder) {
    this.openingForm = new FormRecord<FormControl<number>>({});
    this.currencies = EnumValues.getNames(Currency);
    for (let cur of this.currencies) {
      this.openingForm.addControl(cur, new FormControl());
    }
  }
  ngOnInit(): void {}
}
