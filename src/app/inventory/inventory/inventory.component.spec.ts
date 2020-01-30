import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InventoryService } from '@efaps/pos-library';
import { MockComponent } from 'ng-mocks';
import { Observable } from 'rxjs';

import { MaterialModule } from '../../material/material.module';
import { InventoryTableComponent } from '../inventory-table/inventory-table.component';
import { InventoryComponent } from './inventory.component';

class InventoryServiceStub {
  getWarehouses() {
    return new Observable(observer => {
      observer.next([]);
    });
  }
}

describe('InventoryComponent', () => {
  let component: InventoryComponent;
  let fixture: ComponentFixture<InventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MaterialModule
      ],
      providers: [
        { provide: InventoryService, useClass: InventoryServiceStub }
      ],
      declarations: [
        InventoryComponent,
        MockComponent(InventoryTableComponent)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
