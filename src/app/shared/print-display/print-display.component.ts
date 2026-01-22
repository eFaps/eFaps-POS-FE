import { Component, Input, inject, input, signal } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { PrintService } from "@efaps/pos-library";
import { Observable, timer } from "rxjs";

@Component({
  selector: "app-print-display",
  templateUrl: "./print-display.component.html",
  styleUrls: ["./print-display.component.scss"],
  imports: [MatProgressSpinner],
})
export class PrintDisplayComponent {
  private printService = inject(PrintService);

  dialogRef = input<MatDialogRef<any>>();

  loaded = signal<boolean>(false);
  showEmptyMsg = signal<boolean>(false);
  success = signal<boolean>(false);

  previewUrls: any[] = [];

  @Input()
  set printObservable(printObservable: Observable<any> | undefined) {
    const t = this;
    if (printObservable) {
      printObservable.subscribe((printResponses) => {
        if (printResponses != null && printResponses.length > 0) {
          printResponses.forEach(
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
                        t.loaded.set(true);
                      },
                      false,
                    );
                    reader.readAsDataURL(preview);
                  });
              } else {
                t.loaded.set(true);
                t.success.set(true);
                timer(5000).subscribe(() => {
                  this.dialogRef()?.close();
                });
              }
            },
          );
        } else {
          t.loaded.set(true);
          t.showEmptyMsg.set(true);
        }
      });
    }
  }
}
