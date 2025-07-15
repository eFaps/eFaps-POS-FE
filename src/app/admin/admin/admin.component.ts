import { LazyElementDynamicDirective } from "@angular-extensions/elements";
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnDestroy, OnInit, inject } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import {
  MatChipGrid,
  MatChipInput,
  MatChipInputEvent,
  MatChipRemove,
  MatChipRow,
} from "@angular/material/chips";
import { MatDialog } from "@angular/material/dialog";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { MatSlideToggle } from "@angular/material/slide-toggle";
import { Router } from "@angular/router";
import { LocalStorage } from "@efaps/ngx-store";
import {
  AdminService,
  BarcodeOptions,
  BarcodeScannerService,
  ConfigService,
  Extension,
  PrintService,
  Versions,
  WorkspaceService,
} from "@efaps/pos-library";

import { SalesReportDialogComponent } from "../sales-report-dialog/sales-report-dialog.component";
import { PrintDialogComponent } from "src/app/shared/print-dialog/print-dialog.component";
import { STOCKTAKING_ACTIVATE } from "src/app/util/keys";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    MatButton,
    MatSlideToggle,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatChipGrid,
    MatChipRow,
    MatIcon,
    MatChipRemove,
    MatChipInput,
    LazyElementDynamicDirective,
  ],
})
export class AdminComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private adminService = inject(AdminService);
  private configService = inject(ConfigService);
  private barcodeScannerService = inject(BarcodeScannerService);
  private workspaceService = inject(WorkspaceService);
  private printService = inject(PrintService);
  private fb = inject(FormBuilder);
  private dialog = inject(MatDialog);

  versions: Versions | undefined;
  lazyElements: Extension[] = [];
  @LocalStorage() barcodeOptions: BarcodeOptions = {};
  barcodeOptionsForm: FormGroup;
  stocktakingActivate = false;
  salesReportActive = false;
  workspaceOid!: string;

  constructor() {
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

    this.workspaceService.currentWorkspace.subscribe({
      next: (workspace) => {
        if (workspace) {
          this.salesReportActive = workspace.printCmds.some(
            (x) => x.target === "SALESREPORT",
          );
          this.workspaceOid = workspace.oid;
        } else {
          this.salesReportActive = false;
        }
      },
    });
  }

  ngOnDestroy(): void {
    if (this.hasBarcodeScanner) {
      this.barcodeScannerService.setOptions(this.barcodeOptions);
    }
  }

  reload() {
    this.adminService.reload().subscribe();
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

  salesReport() {
    const dialogRef = this.dialog.open(SalesReportDialogComponent);
    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value && value.date) {
          console.log((value.date as Date).toISOString());
          const localDate = (value.date as Date).toISOString().substring(0, 10);
          this.dialog.open(PrintDialogComponent, {
            data: this.printService.printSalesReport(
              this.workspaceOid,
              localDate,
            ),
          });
        }
      },
    });
  }
}
