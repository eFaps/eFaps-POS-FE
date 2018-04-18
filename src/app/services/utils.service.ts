import { Injectable } from '@angular/core';
import { getLocaleNumberFormat, NumberFormatStyle, registerLocaleData } from '@angular/common';

import localeEs from '@angular/common/locales/es';
import * as parseDecimalNumber from 'parse-decimal-number';

@Injectable()
export class UtilsService {

  constructor() {
    registerLocaleData(localeEs);
  }

  parse(_numberStr: string): number {
      const customSeparators = { thousands: ',', decimal: '.' };
      return parseDecimalNumber(_numberStr, customSeparators);
  }

  toString(_number: number): string {
      return _number.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
}
