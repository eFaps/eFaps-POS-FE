import { Injectable } from '@angular/core';
import { Discount, DiscountType, Document, DocItem, Product, TaxEntry } from '../model';
import { TaxService } from './tax.service';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor(private taxService: TaxService) { }

  applyDiscount(document: Document, discount: Discount): Document {
    if (discount.type === DiscountType.PERCENT) {
      this.applyPercent(document, discount);
    }
    return document;
  }

  private applyPercent(document: Document, discount: Discount): Document {

    const net = -(document.netTotal * (discount.value / 100));
    const cross = -(document.crossTotal * (discount.value / 100));
    const item: DocItem = {
      index: document.items.length + 1,
      product: this.getDiscountProduct(discount),
      quantity: 1,
      netPrice: net,
      netUnitPrice: net,
      crossPrice: cross,
      crossUnitPrice: cross,
      taxes: []
    }

    document.taxes.forEach(taxEntry => {
      item.taxes.push(
        {
          tax: taxEntry.tax,
          base: taxEntry.base - (taxEntry.base * (discount.value / 100)),
          amount: -(taxEntry.amount * (discount.value / 100))
        }
      )
    })
    console.log(item);
    document.items.push(item);
    return this.recalculate(document);
  }

  private recalculate(document: Document): Document {
    let crossTotal = 0;
    let netTotal = 0;
    document.items.forEach(item => {
      crossTotal = crossTotal + item.crossPrice;
      netTotal = netTotal + item.netPrice;
    });
    document.taxes = this.taxService.calculateTax(document);
    document.crossTotal = netTotal + this.taxService.taxTotal(document);
    document.netTotal = netTotal;
    return document;
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
