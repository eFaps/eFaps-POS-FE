import { TranslateLoader } from "@ngx-translate/core";
import { Observable } from 'rxjs';

export class TranslateFileLoader implements TranslateLoader {
  constructor(
    private _prefix: string = "./assets/i18n",
    private _suffix: string = ".json"
  ) {}

  public getTranslation(_lang: string): Observable<any> {
    return new Observable();
  }
}
