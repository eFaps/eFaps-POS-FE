import {
  NumberFormatStyle,
  getCurrencySymbol,
  getLocaleNumberFormat,
  registerLocaleData
} from '@angular/common';
import localeEsPE from '@angular/common/locales/es-PE';
import { Injectable } from '@angular/core';
import * as parseDecimalNumber from 'parse-decimal-number';

@Injectable()
export class UtilsService {

  constructor() {
    registerLocaleData(localeEsPE);
  }

  parse(_numberStr: string): number {
    const customSeparators = { thousands: ',', decimal: '.' };
    return parseDecimalNumber(_numberStr, customSeparators);
  }

  toString(_number: number): string {
    return _number.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  getCurrencySymbol(_isoCode: string) {
    return getCurrencySymbol(_isoCode, 'narrow', 'es-PE');
  }
}
