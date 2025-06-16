import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  inject,
} from "@angular/core";
import { MatButton } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatIcon } from "@angular/material/icon";
import { MatPaginator } from "@angular/material/paginator";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from "@angular/material/table";
import { MatTooltip } from "@angular/material/tooltip";
import { EnquiryService, Page, RUC } from "@efaps/pos-library";

@Component({
  selector: "app-taxpayer-result",
  templateUrl: "./taxpayer-result.component.html",
  styleUrls: ["./taxpayer-result.component.scss"],
  imports: [
    MatProgressSpinner,
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatIcon,
    MatTooltip,
    MatButton,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    MatPaginator,
  ],
})
export class TaxpayerResultComponent implements OnInit, AfterViewInit {
  private dialogRef =
    inject<MatDialogRef<TaxpayerResultComponent>>(MatDialogRef);
  private data = inject(MAT_DIALOG_DATA);
  private enquiryService = inject(EnquiryService);

  isLoadingResults = false;
  displayedColumns = ["id", "name", "warnings", "cmd"];
  dataSource: RUC[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  result!: Page<RUC>;

  ngOnInit(): void {
    this.isLoadingResults = true;
    this.enquiryService
      .findRUCs(this.getTerm(), { page: 0, size: 5 })
      .subscribe({
        next: (result) => {
          this.result = result;
          this.dataSource = result.content;
          if (this.paginator) {
            this.paginator.length = result.totalElements;
          }
          this.isLoadingResults = false;
        },
      });
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe({
      next: (pageEvent: { pageIndex: any; pageSize: any }) => {
        this.isLoadingResults = true;
        this.enquiryService
          .findRUCs(this.getTerm(), {
            page: pageEvent.pageIndex,
            size: pageEvent.pageSize,
          })
          .subscribe({
            next: (result) => {
              this.result = result;
              this.dataSource = result.content;
              this.paginator.length = result.totalElements;
              this.isLoadingResults = false;
            },
          });
      },
    });
  }

  getTerm(): string {
    if (this.data && this.data.split) {
      const term = (<string>this.data).split(" ").join('" "');
      return `"${term}""`;
    }
    return "";
  }

  select(item: RUC) {
    this.dialogRef.close(item);
  }
}
