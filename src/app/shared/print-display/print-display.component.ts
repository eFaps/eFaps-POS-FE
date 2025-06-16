import { Component, Input, OnInit, inject } from "@angular/core";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { PrintService } from "@efaps/pos-library";
import { Observable } from "rxjs";

@Component({
  selector: "app-print-display",
  templateUrl: "./print-display.component.html",
  styleUrls: ["./print-display.component.scss"],
  imports: [MatProgressSpinner],
})
export class PrintDisplayComponent implements OnInit {
  private printService = inject(PrintService);

  previewUrls: any[] = [];
  loaded = false;
  showEmptyMsg = false;
  success = false;

  ngOnInit() {}

  @Input()
  set printObservable(printObservable: Observable<any> | undefined) {
    const t = this;
    if (printObservable) {
      printObservable.subscribe((_printResponses) => {
        if (_printResponses.length < 1) {
          t.loaded = true;
          t.showEmptyMsg = true;
        } else {
          _printResponses.forEach(
            (_printResponse: { printer: { type: string }; key: string }) => {
              if (_printResponse.printer.type === "PREVIEW") {
                this.printService
                  .getPreview(_printResponse.key)
                  .subscribe((preview) => {
                    const reader = new FileReader();
                    reader.addEventListener(
                      "load",
                      () => {
                        t.previewUrls.push(reader.result);
                        t.loaded = true;
                      },
                      false,
                    );
                    reader.readAsDataURL(preview);
                  });
              } else {
                t.success = true;
                t.loaded = true;
              }
            },
          );
        }
      });
    }
  }
}
