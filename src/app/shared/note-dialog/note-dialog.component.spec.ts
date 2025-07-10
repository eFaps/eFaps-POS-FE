import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { NoteDialogComponent } from "./note-dialog.component";

describe("NoteDialogComponent", () => {
  let component: NoteDialogComponent;
  let fixture: ComponentFixture<NoteDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoteDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NoteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
