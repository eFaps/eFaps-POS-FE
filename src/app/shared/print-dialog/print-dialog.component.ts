import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { PrintService } from '../../services/index';

@Component({
  selector: 'app-print-dialog',
  templateUrl: './print-dialog.component.html',
  styleUrls: ['./print-dialog.component.scss']
})
export class PrintDialogComponent implements OnInit {
  previewUrls: any[] = [];
  loaded = false;
  showEmptyMsg = false;
  success = false;

  constructor(private printService: PrintService,
    @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
    const t = this;
    this.data.subscribe(_printResponses => {
      if (_printResponses.length < 1) {
        t.loaded = true;
        t.showEmptyMsg = true;
      } else {
        _printResponses.forEach(_printResponse => {
          if (_printResponse.printer.type === 'PREVIEW') {
            this.printService.getPreview(_printResponse.key).subscribe(preview => {
              const reader = new FileReader();
              reader.addEventListener('load', () => {
                t.previewUrls.push(reader.result);
                t.loaded = true;
              }, false);
              reader.readAsDataURL(preview);
            });
          } else {
            t.success = true;
            t.loaded = true;
          }
        });
      }
    });
  }
}
