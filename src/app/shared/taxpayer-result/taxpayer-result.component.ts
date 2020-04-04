import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  AfterViewInit
} from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TaxpayerService, Taxpayer } from "@efaps/pos-library";
import { MatPaginator } from "@angular/material/paginator";
import { Page } from "@efaps/pos-library/lib/model/pageable";

@Component({
  selector: "app-taxpayer-result",
  templateUrl: "./taxpayer-result.component.html",
  styleUrls: ["./taxpayer-result.component.scss"]
})
export class TaxpayerResultComponent implements OnInit, AfterViewInit {
  isLoadingResults = false;
  displayedColumns = ["id", "name"];
  dataSource: Taxpayer[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  result: Page<Taxpayer>;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private taxpayerService: TaxpayerService
  ) {}

  ngOnInit(): void {
    this.isLoadingResults = true;
    this.taxpayerService
      .findTaxpayers(this.data, { page: 0, size: 5 })
      .subscribe({
        next: result => {
          this.result = result;
          this.dataSource = result.content;
          this.paginator.length = result.totalElements;
          this.isLoadingResults = false;
        }
      });
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe({
      next: pageEvent => {
        this.isLoadingResults = true;
        this.taxpayerService
          .findTaxpayers(this.data, {
            page: pageEvent.pageIndex,
            size: pageEvent.pageSize
          })
          .subscribe({
            next: result => {
              this.result = result;
              this.dataSource = result.content;
              this.paginator.length = result.totalElements;
              this.isLoadingResults = false;
            }
          });
      }
    });
  }
}
