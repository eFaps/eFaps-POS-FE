import { TranslateLoader } from "@ngx-translate/core";
import { Observable } from "rxjs";

export class TranslateFileLoader implements TranslateLoader {
  constructor(
    private _prefix = "./assets/i18n",
    private _suffix = ".json",
  ) {}

  public getTranslation(): Observable<unknown> {
    return new Observable();
  }
}
