import { EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Item, Product } from '../model/index';
import { PosService, ProductService } from '../services/index';
import { MatDialog } from '@angular/material';
import { RemarkDialogComponent } from './remark-dialog/remark-dialog.component';

export abstract class AbstractProductSelector implements OnInit {
  ticket: Item[];
  @Input() multiplier: number;
  @Input() remarkMode = false;
  @Output() selection = new EventEmitter<number>();

  constructor(protected productService: ProductService,
    protected posService: PosService,
    protected dialog: MatDialog) { }

  ngOnInit() {
    this.posService.currentTicket.subscribe(_ticket => this.ticket = _ticket);
  }

  select(product: Product) {
    if (this.remarkMode) {
      const dialogRef = this.dialog.open(RemarkDialogComponent, {
        data: product,
      });
      dialogRef.afterClosed().subscribe({
        next: comment => {
          this.selectProduct(product, comment);
        }
      });
    } else {
      this.selectProduct(product, null);
    }
  }

  private selectProduct(product: Product, remark: string) {
    const quantity = this.multiplier > 0 ? this.multiplier : 1;
    this.ticket.push({
      product: product,
      quantity: quantity,
      price: 0,
      remark: remark
    });
    this.syncTicket();
    this.selection.emit(0);
  }

  syncTicket() {
    this.posService.changeTicket(this.ticket);
  }
}
