import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

export function TranslateLoaderFactory(_httpClient: HttpClient) {
  return new TranslateHttpLoader(_httpClient, "./assets/i18n/");
}
