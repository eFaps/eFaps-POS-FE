import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
  FormBuilder,
  NonNullableFormBuilder,
  FormGroup,
} from "@angular/forms";
import { TaxpayerService, Taxpayer } from "@efaps/pos-library";
import { MatLegacyDialog as MatDialog } from "@angular/material/legacy-dialog";
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
    private taxpayerService: TaxpayerService,
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
      this.taxpayerService.getTaxpayer(this.taxpayerForm.value.term).subscribe({
        next: (taxpayer) => {
          this.result.next(taxpayer);
        },
      });
    }
  }
}
