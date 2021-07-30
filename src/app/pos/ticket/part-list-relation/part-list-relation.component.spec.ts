import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartListRelationComponent } from './part-list-relation.component';

describe('PartListRelationComponent', () => {
  let component: PartListRelationComponent;
  let fixture: ComponentFixture<PartListRelationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartListRelationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartListRelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
