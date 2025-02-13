import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormRecord, Validators } from '@angular/forms';

@Component({
  selector: 'app-sales-report-dialog',
  standalone: true,
  imports: [],
  templateUrl: './sales-report-dialog.component.html',
  styleUrl: './sales-report-dialog.component.scss'
})
export class SalesReportDialogComponent {
  reportForm: FormGroup;

   constructor(fb: FormBuilder) {
      this.reportForm = fb.group({
        date: [new Date(), [Validators.required]],
      });
    }
}
