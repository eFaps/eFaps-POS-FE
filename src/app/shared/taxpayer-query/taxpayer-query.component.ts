import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { TaxpayerService, Taxpayer } from "@efaps/pos-library";
import { MatDialog } from '@angular/material/dialog';
import { TaxpayerResultComponent } from '../taxpayer-result/taxpayer-result.component';

@Component({
  selector: "app-taxpayer-query",
  templateUrl: "./taxpayer-query.component.html",
  styleUrls: ["./taxpayer-query.component.scss"]
})
export class TaxpayerQueryComponent implements OnInit {
  taxpayerForm: FormGroup;
  nameSearch = false;
  @Output()
  result: EventEmitter<Taxpayer> = new EventEmitter<Taxpayer>();

  constructor(
    private fb: FormBuilder,
    private taxpayerService: TaxpayerService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.taxpayerForm = this.fb.group({
      term: ["", [Validators.required, Validators.pattern("[0-9]{11}")]]
    });
  }

  setNameSearch() {
    this.nameSearch = !this.nameSearch;
    if (this.nameSearch) {
      this.taxpayerForm
        .get("term")
        .setValidators([Validators.required, Validators.minLength(2)]);
    } else {
      this.taxpayerForm
        .get("term")
        .setValidators([Validators.required, Validators.pattern("[0-9]{11}")]);
    }
  }

  query() {
    if (this.nameSearch) {
      this.dialog.open(TaxpayerResultComponent, {
        data: this.taxpayerForm.value.term,
        maxHeight: "95vh"
      })
    } else {
      this.taxpayerService.getTaxpayer(this.taxpayerForm.value.term).subscribe({
        next: taxpayer => {
          this.result.next(taxpayer);
        }
      });
    }
  }
}
