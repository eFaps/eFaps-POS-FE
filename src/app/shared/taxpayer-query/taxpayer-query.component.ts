import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-taxpayer-query',
  templateUrl: './taxpayer-query.component.html',
  styleUrls: ['./taxpayer-query.component.scss']
})
export class TaxpayerQueryComponent implements OnInit {
  taxpayerForm: FormGroup;
  nameSearch = false;

  constructor(    private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.taxpayerForm = this.fb.group({
      term: [""]
    });
  }

  get toggleLabel() {
    return this.nameSearch ?     $localize `Search by Name`
 : $localize `Search by TaxpayerId`;
  }

 setNameSearch() {
    this.nameSearch = !this.nameSearch
  }
}
