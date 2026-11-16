import { TranslateLoader } from "@ngx-translate/core";
import * as fs from "fs";
import { Observable } from "rxjs";

export class TranslateFileLoader implements TranslateLoader {
  constructor(
    private prefix = "./assets/i18n",
    private suffix = ".json",
  ) {}

  /**
   * Gets the translations from the server
   * @param lang
   * @returns {any}
   */
  public getTranslation(lang: string): Observable<unknown> {
    return new Observable((observer) => {
      const fileName = `${__dirname}/${this.prefix}/${lang}${this.suffix}`;
      observer.next(JSON.parse(fs.readFileSync(fileName, "utf8")));
      observer.complete();
    });
  }
}
