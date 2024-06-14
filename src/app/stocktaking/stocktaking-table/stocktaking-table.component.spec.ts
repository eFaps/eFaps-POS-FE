import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StocktakingTableComponent } from "./stocktaking-table.component";
import { MatDialogModule } from "@angular/material/dialog";
import {
  PosConfigToken,
  StocktakingService,
  PageRequest,
} from "@efaps/pos-library";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { Observable } from "rxjs";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

class StocktakingServiceStub {
  getStocktakings(expand?: boolean, pageable?: PageRequest) {
    return new Observable((observer) => {
      observer.next({
        content: [],
      });
    });
  }
}

describe("StocktakingTableComponent", () => {
  let component: StocktakingTableComponent;
  let fixture: ComponentFixture<StocktakingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [StocktakingTableComponent],
    imports: [MatDialogModule],
    providers: [
        { provide: PosConfigToken, useValue: {} },
        { provide: StocktakingService, useClass: StocktakingServiceStub },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
    ]
}).compileComponents();

    fixture = TestBed.createComponent(StocktakingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
