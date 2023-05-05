import { LiveAnnouncer } from "@angular/cdk/a11y";
import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatLegacyDialogModule as MatDialogModule } from "@angular/material/legacy-dialog";
import { MatLegacyFormFieldModule as MatFormFieldModule } from "@angular/material/legacy-form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatLegacyInputModule as MatInputModule } from "@angular/material/legacy-input";
import { MatLegacyTableModule as MatTableModule } from "@angular/material/legacy-table";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ProductService } from "@efaps/pos-library";
import { MatKeyboardModule } from "@efaps/angular-onscreen-material-keyboard";
import { MockComponent } from "ng-mocks";
import { Observable } from "rxjs";

import { VirtKeyboardDirective } from "../../services";
import { ProductComponent } from "../../shared/product/product.component";
import { ProducttableComponent } from "./producttable.component";
import { MatLegacyPaginatorModule as MatPaginatorModule } from "@angular/material/legacy-paginator";
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
