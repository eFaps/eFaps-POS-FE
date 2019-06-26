import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services';
import { Category } from '../../model';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-category-select',
  templateUrl: './category-select.component.html',
  styleUrls: ['./category-select.component.scss']
})
export class CategorySelectComponent implements OnInit {
  categories: Category[] = [];

  constructor(private productService: ProductService,
    public dialogRef: MatDialogRef<CategorySelectComponent>) { }

  ngOnInit() {
    this.productService.getCategories()
      .subscribe(_categories => this.categories = _categories);
  }

  selectCategory(index: number) {
    this.dialogRef.close(index);
  }
}
