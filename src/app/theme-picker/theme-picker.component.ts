import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from "@angular/core";
import { LocalStorage } from "@efaps/ngx-store";

import { DocsSiteTheme, StyleManagerService } from "../services/index";

@Component({
  selector: "app-theme-picker",
  templateUrl: "./theme-picker.component.html",
  styleUrls: ["./theme-picker.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ThemePickerComponent {
  @LocalStorage() currentTheme;
  themes = [
    {
      primary: "#673AB7",
      accent: "#FFC107",
      href: "deeppurple-amber.css",
      isDark: false
    },
    {
      primary: "#3F51B5",
      accent: "#E91E63",
      href: "indigo-pink.css",
      isDark: false,
      isDefault: true
    },
    {
      primary: "#E91E63",
      accent: "#607D8B",
      href: "pink-bluegrey.css",
      isDark: true
    },
    {
      primary: "#9C27B0",
      accent: "#4CAF50",
      href: "purple-green.css",
      isDark: true
    }
  ];
  constructor(public styleManager: StyleManagerService) {
    if (this.currentTheme) {
      this.installTheme(this.currentTheme);
    } else {
      this.installTheme(this.themes[1]);
    }
  }
  installTheme(theme: DocsSiteTheme) {
    this.currentTheme = this._getCurrentThemeFromHref(theme.href);
    this.styleManager.setStyle("theme", `assets/${theme.href}`);
  }

  private _getCurrentThemeFromHref(href: string): DocsSiteTheme {
    return this.themes.find(theme => theme.href === href);
  }
}
