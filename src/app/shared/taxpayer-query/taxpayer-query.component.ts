import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Validators, NonNullableFormBuilder, FormGroup } from "@angular/forms";
import { EnquiryService, Taxpayer } from "@efaps/pos-library";
import { MatDialog } from "@angular/material/dialog";
import { TaxpayerResultComponent } from "../taxpayer-result/taxpayer-result.component";

@Component({
  selector: "app-taxpayer-query",
  templateUrl: "./taxpayer-query.component.html",
  styleUrls: ["./taxpayer-query.component.scss"],
})
export class TaxpayerQueryComponent {
  taxpayerForm: FormGroup;
  nameSearch = false;
  @Output()
  result: EventEmitter<Taxpayer> = new EventEmitter<Taxpayer>();

  constructor(
    private fb: NonNullableFormBuilder,
    private enquiryService: EnquiryService,
    private dialog: MatDialog
  ) {
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
          this.result.next(taxpayer);
        },
      });
    } else {
      this.enquiryService.getTaxpayer(this.taxpayerForm.value.term).subscribe({
        next: (taxpayer) => {
          this.result.next(taxpayer);
        },
      });
    }
  }
}
