import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '../../material/material.module';
import { ConfigService, WorkspaceService } from '../../services/index';
import { InventoryTableComponent } from '../inventory-table/inventory-table.component';
import { InventoryComponent } from './inventory.component';

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
        HttpClient,
        HttpHandler,
        ConfigService,
        WorkspaceService
      ],
      declarations: [ InventoryComponent, InventoryTableComponent ]
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
