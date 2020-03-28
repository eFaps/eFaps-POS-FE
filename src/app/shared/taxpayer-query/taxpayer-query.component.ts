import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { TaxpayerService, Taxpayer } from "@efaps/pos-library";

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
    private taxpayerService: TaxpayerService
  ) {}

  ngOnInit(): void {
    this.taxpayerForm = this.fb.group({
      term: [""]
    });
  }

  setNameSearch() {
    this.nameSearch = !this.nameSearch;
  }

  query() {
    this.taxpayerService.getTaxpayer(this.taxpayerForm.value.term).subscribe({
      next: taxpayer => {
        this.result.next(taxpayer);
      }
    });
  }
}
