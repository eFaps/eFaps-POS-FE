import { provideZonelessChangeDetection } from "@angular/core";
import { inject, TestBed } from "@angular/core/testing";
import { beforeEach, describe, expect, it } from "vitest";

import { StyleManagerService } from "./style-manager.service";

describe("StyleManagerService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), StyleManagerService],
    });
  });

  it("should be created", inject(
    [StyleManagerService],
    (service: StyleManagerService) => {
      expect(service).toBeTruthy();
    },
  ));
});
