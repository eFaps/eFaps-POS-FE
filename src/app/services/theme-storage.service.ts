import { Injectable, EventEmitter } from '@angular/core';

export interface DocsSiteTheme {
  primary: string;
  accent: string;
  href: string;
  isDark: boolean;
  isDefault?: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class ThemeStorageService {
  static storageKey = 'docs-theme-storage-current';

  onThemeUpdate: EventEmitter<DocsSiteTheme> = new EventEmitter<DocsSiteTheme>();

  storeTheme(theme: DocsSiteTheme) {
    try {
      window.localStorage[ThemeStorageService.storageKey] = JSON.stringify(theme);
    } catch (e) { }

    this.onThemeUpdate.emit(theme);
  }

  getStoredTheme(): DocsSiteTheme {
    try {
      return JSON.parse(window.localStorage[ThemeStorageService.storageKey] || null);
    } catch (e) {
      return null;
    }
  }

  clearStorage() {
    try {
      window.localStorage.removeItem(ThemeStorageService.storageKey);
    } catch (e) { }
  }
}
