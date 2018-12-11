import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';

export class TranslateFileLoader implements TranslateLoader {
  constructor(private prefix: string = 'assets/i18n', private suffix: string = '.json') { }

  public getTranslation(lang: string): Observable<any> {
    return Observable.of();
  }
}
