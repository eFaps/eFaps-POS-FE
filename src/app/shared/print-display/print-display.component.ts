import { Component, OnInit, Input } from '@angular/core';
import { PrintService } from '../../services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-print-display',
  templateUrl: './print-display.component.html',
  styleUrls: ['./print-display.component.scss']
})
export class PrintDisplayComponent implements OnInit {
  previewUrls: any[] = [];
  loaded = false;
  showEmptyMsg = false;
  success = false;

  constructor(private printService: PrintService) { }

  ngOnInit() {
  }

  @Input()
  set printObservable(printObservable: Observable<any>) {
    const t = this;
    printObservable.subscribe(_printResponses => {
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
