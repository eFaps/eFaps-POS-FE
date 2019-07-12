import { Injectable } from '@angular/core';
import { Decimal } from 'decimal.js';

import { Discount, DiscountType, DocItem, Document, Order, Product } from '../model';
import { DocumentService } from './document.service';
import { TaxService } from './tax.service';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor(private taxService: TaxService,
    private documentService: DocumentService) { }

  applyDiscount(order: Order, discount: Discount): Document {
    if (order.discount) {
      order.items = order.items.filter(item => item.product.oid != order.discount.productOid);
      order.discount = null;
      this.recalculate(order);
    }

    if (discount && discount.type === DiscountType.PERCENT) {
      order = this.applyPercent(order, discount);
    }
    this.documentService.updateOrder(this.recalculate(order)).subscribe();
    return order;
  }

  private applyPercent(order: Order, discount: Discount): Order {
    const factor = new Decimal(discount.value).div(new Decimal(100));

    const net = new Decimal(order.netTotal).mul(factor).toDecimalPlaces(2, Decimal.ROUND_HALF_UP).neg();
    const cross = new Decimal(order.crossTotal).mul(factor).toDecimalPlaces(2, Decimal.ROUND_HALF_UP).neg();
    const item: DocItem = {
      index: order.items.length + 1,
      product: this.getDiscountProduct(discount),
      quantity: 1,
      netPrice: net.toNumber(),
      netUnitPrice: net.toNumber(),
      crossPrice: cross.toNumber(),
      crossUnitPrice: cross.toNumber(),
      taxes: []
    }

    order.taxes.forEach(taxEntry => {
      const base = new Decimal(taxEntry.base)
        .minus(new Decimal(new Decimal(taxEntry.base).mul(factor)))
        .toDecimalPlaces(2, Decimal.ROUND_HALF_UP);
      const amount = new Decimal(taxEntry.amount).mul(factor).neg()
        .toDecimalPlaces(2, Decimal.ROUND_HALF_UP);

      item.taxes.push(
        {
          tax: taxEntry.tax,
          base: base.toNumber(),
          amount: amount.toNumber()
        }
      )
    })
    order.items.push(item);
    order.discount = discount;
    return order;
  }

  private recalculate(order: Order): Order {
    let crossTotal = new Decimal(0);
    let netTotal = new Decimal(0);
    order.items.forEach(item => {
      crossTotal = crossTotal.plus(new Decimal(item.crossPrice));
      netTotal = netTotal.plus(new Decimal(item.netPrice));
    });
    order.taxes = this.taxService.calculateTax(order);
    order.crossTotal = netTotal.plus(new Decimal(this.taxService.taxTotal(order)))
      .toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toNumber();
    order.netTotal = netTotal.toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toNumber();
    return order;
  }

  private getDiscountProduct(discount: Discount): Product {
    return {
      oid: discount.productOid,
      sku: '',
      description: 'Descuento',
      imageOid: '',
      netPrice: 0,
      crossPrice: 0,
      categoryOids: [],
      taxes: [],
      relations: []
    }
  }
}
