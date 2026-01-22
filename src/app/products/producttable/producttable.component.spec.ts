import { LiveAnnouncer } from "@angular/cdk/a11y";
import { provideZonelessChangeDetection } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatKeyboardModule } from "@efaps/angular-onscreen-material-keyboard";
import { ProductService } from "@efaps/pos-library";
import { MockComponent } from "ng-mocks";
import { Observable } from "rxjs";
import { beforeEach, describe, expect, it } from "vitest";

import { ProductComponent } from "../../shared/product/product.component";
import { ProducttableComponent } from "./producttable.component";

class ProductServiceStub {
  getProducts() {
    return new Observable((observer) => {
      observer.next([{ categoryOids: [] }]);
    });
  }
}

describe("ProducttableComponent", () => {
  let component: ProducttableComponent;
  let fixture: ComponentFixture<ProducttableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatKeyboardModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatPaginatorModule,
        MatSortModule,
        MockComponent(ProductComponent),
        ProducttableComponent,
      ],
      providers: [
        provideZonelessChangeDetection(),
        { provide: ProductService, useClass: ProductServiceStub },
        { provide: LiveAnnouncer, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducttableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
