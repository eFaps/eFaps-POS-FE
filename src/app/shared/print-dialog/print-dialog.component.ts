import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { PrintService } from '../../services/index';

@Component({
  selector: 'app-print-dialog',
  templateUrl: './print-dialog.component.html',
  styleUrls: ['./print-dialog.component.scss']
})
export class PrintDialogComponent implements OnInit {
  previewUrls: any[] = [];
  loaded = false;

  constructor(private printService: PrintService,
    private dialogRef: MatDialogRef<PrintDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
    const t = this;
    this.data.subscribe(printResponses => {
      printResponses.forEach(printResponse => {
        if (printResponse.printer.type === 'PREVIEW') {
          this.printService.getPreview(printResponse.key).subscribe(preview => {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
              t.previewUrls.push(reader.result);
              t.loaded = true;
            }, false);
            reader.readAsDataURL(preview);
          });
        }
      });
    });
  }
}
