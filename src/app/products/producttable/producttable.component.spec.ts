import { LiveAnnouncer } from "@angular/cdk/a11y";
import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ProductService } from "@efaps/pos-library";
import { MatKeyboardModule } from "@efaps/angular-onscreen-material-keyboard";
import { MockComponent } from "ng-mocks";
import { Observable } from "rxjs";

import { VirtKeyboardDirective } from "../../services";
import { ProductComponent } from "../../shared/product/product.component";
import { ProducttableComponent } from "./producttable.component";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";

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
        BrowserAnimationsModule,
        MatKeyboardModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatPaginatorModule,
        MatSortModule
      ],
      providers: [
        { provide: ProductService, useClass: ProductServiceStub },
        { provide: LiveAnnouncer, useValue: {} },
      ],
      declarations: [
        VirtKeyboardDirective,
        MockComponent(ProductComponent),
        ProducttableComponent,
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
