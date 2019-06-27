import { Injectable } from '@angular/core';
import { Discount, DiscountType, Document, DocItem, Product, Order } from '../model';
import { TaxService } from './tax.service';
import { DocumentService } from './document.service';

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
    }

    if (discount.type === DiscountType.PERCENT) {
      this.applyPercent(order, discount);
    }
    return order;
  }

  private applyPercent(order: Order, discount: Discount): Document {
    const net = -(order.netTotal * (discount.value / 100));
    const cross = -(order.crossTotal * (discount.value / 100));
    const item: DocItem = {
      index: order.items.length + 1,
      product: this.getDiscountProduct(discount),
      quantity: 1,
      netPrice: net,
      netUnitPrice: net,
      crossPrice: cross,
      crossUnitPrice: cross,
      taxes: []
    }

    order.taxes.forEach(taxEntry => {
      item.taxes.push(
        {
          tax: taxEntry.tax,
          base: taxEntry.base - (taxEntry.base * (discount.value / 100)),
          amount: -(taxEntry.amount * (discount.value / 100))
        }
      )
    })
    console.log(item);
    order.items.push(item);
    order.discount = discount;
    this.documentService.updateOrder(order).subscribe();
    return this.recalculate(order);
  }

  private recalculate(order: Order): Document {
    let crossTotal = 0;
    let netTotal = 0;
    order.items.forEach(item => {
      crossTotal = crossTotal + item.crossPrice;
      netTotal = netTotal + item.netPrice;
    });
    order.taxes = this.taxService.calculateTax(order);
    order.crossTotal = netTotal + this.taxService.taxTotal(order);
    order.netTotal = netTotal;
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
