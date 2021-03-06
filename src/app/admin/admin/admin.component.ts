import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatChipInputEvent } from "@angular/material/chips";
import { LocalStorage } from "@efaps/ngx-store";
import {
  AdminService,
  BarcodeOptions,
  BarcodeScannerService,
  ConfigService,
  Extension,
  Versions,
} from "@efaps/pos-library";
import { Subscription } from "rxjs";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"],
})
export class AdminComponent implements OnInit, OnDestroy {
  busy: Subscription;
  versions: Versions;
  pinpadsUrl = "extensions/pinpad-element.js";
  lazyElements: Extension[] = [];
  @LocalStorage() barcodeOptions: BarcodeOptions = null;
  barcodeOptionsForm: FormGroup;

  constructor(
    private adminService: AdminService,
    private configService: ConfigService,
    private barcodeScannerService: BarcodeScannerService,
    private fb: FormBuilder
  ) {}

  get hasBarcodeScanner(): boolean {
    return this.barcodeOptions != null;
  }

  ngOnInit() {
    this.adminService
      .version()
      .subscribe((versions) => (this.versions = versions));
    this.configService.getExtensions().subscribe({
      next: (extensions) => {
        extensions
          .filter((extension) => extension.key === "admin")
          .forEach((extension) => {
            this.lazyElements.push(extension);
          });
      },
    });
    this.barcodeOptionsForm = this.fb.group({
      latency: [""],
      minLength: [""],
      endKeys: [],
      validKey: "",
    });
    if (this.barcodeOptions) {
      this.barcodeOptionsForm.setValue(this.barcodeOptions);
    }
    this.barcodeOptionsForm.valueChanges.subscribe({
      next: (values) => {
        this.barcodeOptions = values;
      },
    });
  }

  ngOnDestroy(): void {
    if (this.hasBarcodeScanner) {
      this.barcodeScannerService.setOptions(this.barcodeOptions);
    }
  }

  reload() {
    this.busy = this.adminService.reload().subscribe();
  }

  toggleBarcodeScanner() {
    if (this.hasBarcodeScanner) {
      this.barcodeOptions = null;
    } else {
      this.barcodeOptions = this.barcodeScannerService.getDefaultOptions();
      this.barcodeOptionsForm.setValue(this.barcodeOptions);
    }
  }

  addEndKey(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || "").trim()) {
      this.barcodeOptions.endKeys.push(value.trim());
    }

    if (input) {
      input.value = "";
    }
  }

  removeEndKey(endkey: string): void {
    const index = this.barcodeOptions.endKeys.indexOf(endkey);

    if (index >= 0) {
      this.barcodeOptions.endKeys.splice(index, 1);
    }
  }
}
