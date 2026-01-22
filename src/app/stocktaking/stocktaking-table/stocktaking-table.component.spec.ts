import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideZonelessChangeDetection } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogModule } from "@angular/material/dialog";
import {
  PageRequest,
  PosConfigToken,
  StocktakingService,
} from "@efaps/pos-library";
import { Observable } from "rxjs";
import { beforeEach, describe, expect, it } from "vitest";
import { StocktakingTableComponent } from "./stocktaking-table.component";

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, StocktakingTableComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: PosConfigToken, useValue: {} },
        { provide: StocktakingService, useClass: StocktakingServiceStub },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StocktakingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
