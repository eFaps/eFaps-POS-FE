import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatIconButton } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatFormField } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { MatPaginator } from "@angular/material/paginator";
import { MatSlideToggle } from "@angular/material/slide-toggle";
import { MatSort, MatSortHeader } from "@angular/material/sort";
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
  MatTableDataSource,
} from "@angular/material/table";
import { MatKeyboardModule } from "@efaps/angular-onscreen-material-keyboard";
import { LocalStorage } from "@efaps/ngx-store";
import { PageRequest, Product, ProductService } from "@efaps/pos-library";
import { debounceTime, merge, tap } from "rxjs";

import { VirtKeyboardDirective } from "../../services/virt-keyboard.directive";
import { ProductComponent } from "../../shared/product/product.component";

@Component({
  selector: "app-producttable",
  templateUrl: "./producttable.component.html",
  styleUrls: ["./producttable.component.scss"],
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    VirtKeyboardDirective,
    MatSlideToggle,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatSortHeader,
    MatCellDef,
    MatCell,
    MatIconButton,
    MatIcon,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    MatPaginator,
    MatKeyboardModule,
  ],
})
export class ProducttableComponent implements OnInit, OnDestroy {
  private productService = inject(ProductService);
  private dialog = inject(MatDialog);
  private changeDetectorRefs = inject(ChangeDetectorRef);

  displayedColumns = ["sku", "description", "cmd"];
  dataSource = new MatTableDataSource<Product>();
  _paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @LocalStorage() virtKeyboard = false;
  filterForm: FormGroup;
  textSearch = false;

  constructor() {
    const fb = inject(FormBuilder);

    this.filterForm = fb.group({
      filter: [""],
    });
  }

  @ViewChild(MatPaginator, { static: false })
  set paginator(paginator: MatPaginator) {
    this._paginator = paginator;
    merge(this.sort.sortChange, this._paginator.page)
      .pipe(tap(() => this.loadProducts()))
      .subscribe();
    this.loadProducts();
  }

  ngOnInit() {
    this.filterForm
      .get("filter")!
      .valueChanges.pipe(debounceTime(400))
      .subscribe((value) => this.applyFilter(value));
  }

  ngOnDestroy() {
    // event empty method is needed to allow ngx-store handle class destruction
  }

  loadProducts() {
    var pageRequest: PageRequest = {
      size: this._paginator.pageSize,
      page: this._paginator.pageIndex,
    };
    if (this.sort.active) {
      pageRequest.sort = [this.sort.active + "," + this.sort.direction];
    }
    this.productService.getProducts(pageRequest).subscribe({
      next: (page) => {
        this.dataSource.data = [];
        this.dataSource.paginator = null;
        this.dataSource.sort = null;
        this.dataSource.data = page.content;
        this._paginator.length = page.totalElements;
        this.changeDetectorRefs.detectChanges();
      },
    });
  }

  applyFilter(term: string) {
    this.dataSource.data = [];
    if (term.length > 0) {
      this.productService.findProducts(term, this.textSearch).subscribe({
        next: (data) => {
          this.dataSource.data = this.dataSource.data.concat(data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this._paginator;
        },
      });
    } else {
      this.loadProducts();
    }
  }

  setTextSearch() {
    this.textSearch = !this.textSearch;
    this.applyFilter(this.filterForm.value["filter"]);
  }

  show(_product: Product) {
    const dialogRef = this.dialog.open(ProductComponent, {
      data: _product,
      minWidth: "50%",
      minHeight: "70%",
    });
  }
}
