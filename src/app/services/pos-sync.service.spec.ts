import { provideZonelessChangeDetection } from "@angular/core";
import { TestBed } from "@angular/core/testing";

import { PosSyncService } from "./pos-sync.service";

describe("PosSyncService", () => {
  let service: PosSyncService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    service = TestBed.inject(PosSyncService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
