import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StocktakingEntryTableComponent } from "./stocktaking-entry-table.component";
import { PageRequest, StocktakingService } from "@efaps/pos-library";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { MatPaginatorModule } from "@angular/material/paginator";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatSortModule } from "@angular/material/sort";
import { MatDialogModule } from "@angular/material/dialog";

class RouterStub {
  getCurrentNavigation() {
    return {
      extras: {
        state: {},
      },
    };
  }
}

class StocktakingServiceStub {
  getEntries(id: string, pageable?: PageRequest) {
    return new Observable((observer) => {
      observer.next({
        content: [],
      });
    });
  }
}

describe("StocktakingEntryTableComponent", () => {
  let component: StocktakingEntryTableComponent;
  let fixture: ComponentFixture<StocktakingEntryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatPaginatorModule,
        NoopAnimationsModule,
        MatSortModule,
        MatDialogModule,
      ],
      declarations: [StocktakingEntryTableComponent],
      providers: [
        { provide: StocktakingService, useClass: StocktakingServiceStub },
        { provide: Router, useClass: RouterStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StocktakingEntryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
