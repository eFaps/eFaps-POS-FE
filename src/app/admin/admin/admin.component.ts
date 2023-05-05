import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatLegacyChipInputEvent as MatChipInputEvent } from "@angular/material/legacy-chips";
import { Router } from "@angular/router";
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
import { STOCKTAKING_ACTIVATE } from "src/app/util/keys";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"],
})
export class AdminComponent implements OnInit, OnDestroy {
  busy!: Subscription;
  versions: Versions | undefined;
  lazyElements: Extension[] = [];
  @LocalStorage() barcodeOptions: BarcodeOptions = {};
  barcodeOptionsForm: FormGroup;
  stocktakingActivate = false;

  constructor(
    private router: Router,
    private adminService: AdminService,
    private configService: ConfigService,
    private barcodeScannerService: BarcodeScannerService,
    private fb: FormBuilder
  ) {
    this.barcodeOptionsForm = this.fb.group({
      latency: "",
      minLength: "",
      endKeys: "",
      validKey: "",
    });
  }

  get hasBarcodeScanner(): boolean {
    return (
      this.barcodeOptions?.latency != undefined ||
      this.barcodeOptions?.minLength != undefined ||
      this.barcodeOptions?.endKeys != undefined ||
      this.barcodeOptions?.validKey != undefined
    );
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
    this.configService
      .getSystemConfig<boolean>(STOCKTAKING_ACTIVATE)
      .subscribe({
        next: (value) => {
          this.stocktakingActivate = value;
        },
      });

    if (this.hasBarcodeScanner) {
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
      this.barcodeOptions = {};
    } else {
      this.barcodeOptions = this.barcodeScannerService.getDefaultOptions();
      this.barcodeOptionsForm.setValue(this.barcodeOptions);
    }
  }

  addEndKey(event: MatChipInputEvent): void {
    const input = event.chipInput.inputElement;
    const value = event.value;

    if ((value || "").trim()) {
      this.barcodeOptions.endKeys?.push(value.trim());
    }

    if (input) {
      input.value = "";
    }
  }

  removeEndKey(endkey: string): void {
    const index = this.barcodeOptions.endKeys?.indexOf(endkey);

    if (index && index >= 0) {
      this.barcodeOptions.endKeys?.splice(index, 1);
    }
  }

  stocktaking() {
    this.router.navigate(["stocktaking"]);
  }
}
