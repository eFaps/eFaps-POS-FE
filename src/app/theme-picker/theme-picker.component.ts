import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
} from "@angular/core";
import { LocalStorage } from "@efaps/ngx-store";

import { MatIconButton } from "@angular/material/button";
import { MatGridList, MatGridTile } from "@angular/material/grid-list";
import { MatIcon } from "@angular/material/icon";
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";
import { MatTooltip } from "@angular/material/tooltip";
import { DocsSiteTheme, StyleManagerService } from "../services/index";

@Component({
  selector: "app-theme-picker",
  templateUrl: "./theme-picker.component.html",
  styleUrls: ["./theme-picker.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    MatIconButton,
    MatTooltip,
    MatMenuTrigger,
    MatIcon,
    MatMenu,
    MatGridList,
    MatGridTile,
    MatMenuItem,
  ],
})
export class ThemePickerComponent {
  styleManager = inject(StyleManagerService);

  @LocalStorage() currentTheme: DocsSiteTheme | undefined;
  themes: DocsSiteTheme[] = [
    {
      color: "#343dff",
      background: "#1e1a1d",
      displayName: "Azure & Blue",
      href: "azure-blue.css",
    },
    {
      background: "#ffd9e1",
      displayName: "Rose & Red",
      href: "rose-red.css",
      color: "#ba005c",
    },
    {
      color: "#810081",
      background: "#1e1a1d",
      displayName: "Magenta & Violet",
      href: "magenta-violet.css",
    },
    {
      color: "#004f4f",
      displayName: "Cyan & Orange",
      href: "cyan-orange.css",
      background: "#191c1c",
    },
  ];
  constructor() {
    if (this.currentTheme) {
      this.installTheme(this.currentTheme);
    } else {
      this.installTheme(this.themes[1]);
    }
  }
  installTheme(theme: DocsSiteTheme) {
    this.currentTheme = this._getCurrentThemeFromHref(theme.href);
    this.styleManager.setStyle("theme", `${theme.href}`);
  }

  private _getCurrentThemeFromHref(href: string): DocsSiteTheme | undefined {
    return this.themes.find((theme) => theme.href === href);
  }
}
