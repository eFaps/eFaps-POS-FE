import { Component, EventEmitter, Output } from "@angular/core";
import { FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { EnquiryService, RUC } from "@efaps/pos-library";
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
  result: EventEmitter<RUC> = new EventEmitter<RUC>();

  constructor(
    private fb: NonNullableFormBuilder,
    private enquiryService: EnquiryService,
    private dialog: MatDialog,
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
      this.enquiryService.getRUC(this.taxpayerForm.value.term).subscribe({
        next: (taxpayer) => {
          this.result.next(taxpayer);
        },
      });
    }
  }
}
