import { Injectable } from '@angular/core';
import { TaxEntry, Document } from '../model';

@Injectable({
  providedIn: 'root'
})
export class TaxService {

  constructor() { }

  calculateTax(document: Document): TaxEntry[] {
    const taxEntries: TaxEntry[] = [];
    const taxValues: Map<string, TaxEntry> = new Map();
    document.items.forEach(_item => {
      _item.taxes.forEach(_taxEntry => {
        if (!taxValues.has(_taxEntry.tax.name)) {
          taxValues.set(_taxEntry.tax.name, {
            tax: _taxEntry.tax,
            base: 0,
            amount: 0,
          });
        }
        const ce = taxValues.get(_taxEntry.tax.name);
        ce.amount = ce.amount + _taxEntry.amount;
        ce.base = ce.base + _taxEntry.base;
        taxValues.set(_taxEntry.tax.name, ce);
      });
    });
    taxValues.forEach((_value, _key) => {
      taxEntries.push(_value);
    });
    return taxEntries;
  }

  taxTotal(document: Document): number {
    let total = 0;
    document.taxes.forEach(entry => {
      total = total + entry.amount;
    });
    return total;
  }
}
