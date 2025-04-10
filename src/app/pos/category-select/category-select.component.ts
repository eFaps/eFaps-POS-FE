import { Component, OnInit, inject } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { Category, ProductService } from "@efaps/pos-library";

@Component({
  selector: "app-category-select",
  templateUrl: "./category-select.component.html",
  styleUrls: ["./category-select.component.scss"],
  standalone: false,
})
export class CategorySelectComponent implements OnInit {
  private productService = inject(ProductService);
  dialogRef = inject<MatDialogRef<CategorySelectComponent>>(MatDialogRef);

  categories: Category[] = [];
  rootCategories: Category[] = [];

  ngOnInit() {
    this.productService.getCategories().subscribe((_categories) => {
      this.categories = _categories;
      this.rootCategories = this.categories.filter(
        (category) => category.parentOid == null,
      );
    });
  }

  selectCategory(index: number) {
    this.dialogRef.close(index);
  }
}
