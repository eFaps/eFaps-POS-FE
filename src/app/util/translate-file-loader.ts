import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import * as fs from 'fs';

export class TranslateFileLoader implements TranslateLoader {
  constructor(private prefix: string = './assets/i18n', private suffix: string = '.json') { }

  /**
   * Gets the translations from the server
   * @param lang
   * @returns {any}
   */
  public getTranslation(lang: string): Observable<any> {
    return Observable.create(observer => {
      const fileName = `${__dirname}/${this.prefix}/${lang}${this.suffix}`;
      observer.next(JSON.parse(fs.readFileSync(fileName, 'utf8')));
      observer.complete();
    });
  }
}
