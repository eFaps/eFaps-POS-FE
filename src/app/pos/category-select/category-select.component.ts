import { Component, inject } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { Category, ProductService } from "@efaps/pos-library";

@Component({
  selector: "app-category-select",
  templateUrl: "./category-select.component.html",
  styleUrls: ["./category-select.component.scss"],
  imports: [MatButton, MatDialogModule],
})
export class CategorySelectComponent {
  private productService = inject(ProductService);
  dialogRef = inject<MatDialogRef<CategorySelectComponent>>(MatDialogRef);

  rootCategories: Category[] = [];
  constructor() {
    this.productService.getCategories().subscribe((categories) => {
      this.rootCategories = categories.filter(
        (category) => category.parentOid == null,
      );
    });
  }

  selectCategory(index: number) {
    this.dialogRef.close(index);
  }
}
