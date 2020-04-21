import { LiveAnnouncer } from "@angular/cdk/a11y";
import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ProductService } from "@efaps/pos-library";
import { MatKeyboardModule } from "angular-onscreen-material-keyboard";
import { MockComponent } from "ng-mocks";
import { Observable } from "rxjs/Observable";

import { VirtKeyboardDirective } from "../../services";
import { ProductComponent } from "../../shared/product/product.component";
import { ProducttableComponent } from "./producttable.component";
import { MatDialogModule } from "@angular/material/dialog";

class ProductServiceStub {
  getProducts() {
    return new Observable(observer => {
      observer.next([{ categoryOids: [] }]);
    });
  }
}

describe("ProducttableComponent", () => {
  let component: ProducttableComponent;
  let fixture: ComponentFixture<ProducttableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatKeyboardModule,
        ReactiveFormsModule,
        MatDialogModule
      ],
      providers: [
        { provide: ProductService, useClass: ProductServiceStub },
        { provide: LiveAnnouncer, useValue: {} }
      ],
      declarations: [
        VirtKeyboardDirective,
        MockComponent(ProductComponent),
        ProducttableComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducttableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
