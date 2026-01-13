import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  computed,
  HostListener,
  inject,
  OnInit,
} from "@angular/core";
import { MatIconButton } from "@angular/material/button";
import { MatIcon, MatIconRegistry } from "@angular/material/icon";
import { MatList, MatListItem } from "@angular/material/list";
import { MatProgressBar } from "@angular/material/progress-bar";
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from "@angular/material/sidenav";
import { MatToolbar } from "@angular/material/toolbar";
import { MatTooltip } from "@angular/material/tooltip";
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import {
  AuthService,
  BarcodeOptions,
  BarcodeScannerService,
  CompanyService,
  hasFlag,
  LoaderService,
  Permission,
  User,
  UserService,
  WorkspaceFlag,
  WorkspaceService,
} from "@efaps/pos-library";
import { TranslateService } from "@ngx-translate/core";
import { SvgIconComponent } from "angular-svg-icon";
import { Hotkey, HotkeyModule, HotkeysService } from "angular2-hotkeys";
import { LocalStorageService } from "ngx-localstorage";

import { ThemePickerComponent } from "./theme-picker/theme-picker.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  imports: [
    MatProgressBar,
    MatToolbar,
    MatIconButton,
    MatIcon,
    SvgIconComponent,
    ThemePickerComponent,
    MatSidenavContainer,
    MatSidenav,
    MatList,
    MatListItem,
    RouterLink,
    MatTooltip,
    MatSidenavContent,
    RouterOutlet,
    HotkeyModule,
  ],
})
export class AppComponent implements OnInit, AfterViewChecked {
  private matIconReg = inject(MatIconRegistry);
  router = inject(Router);
  private cdRef = inject(ChangeDetectorRef);
  authService = inject(AuthService);
  translate = inject(TranslateService);
  private workspaceService = inject(WorkspaceService);
  userService = inject(UserService);
  private hotkeysService = inject(HotkeysService);
  private companyService = inject(CompanyService);
  private barcodeScannerService = inject(BarcodeScannerService);
  private loaderService = inject(LoaderService);
  private readonly storageService = inject(LocalStorageService);

  Permission = Permission;
  title = "app";
  screenWidth: number;
  workspace!: string;
  company!: string | null;
  spots = false;
  inventory = false;
  allowPayment = false;
  showRemote = false;
  barcodeOptions: BarcodeOptions | null =
    this.storageService.get<BarcodeOptions>("barcodeOptions");
  userInfo: User | null = null;
  isLoading = this.loaderService.isLoading;

  constructor() {
    const translate = this.translate;
    const workspaceService = this.workspaceService;

    computed(() => console.log(this.loaderService.isLoading()));

    translate.use(workspaceService.getLanguage());
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      this.screenWidth = window.innerWidth;
    };
    this.hotkeysService.add(
      new Hotkey(
        "shift+f1",
        (event: KeyboardEvent): boolean => {
          console.log("Typed hotkey");
          this.router.navigate(["/pos"]);
          return false;
        },
        undefined,
        "Send a secret message to the console.",
      ),
    );
    this.hotkeysService.add(
      new Hotkey(
        "shift+f2",
        (event: KeyboardEvent): boolean => {
          console.log("Typed hotkey");
          this.router.navigate(["/orders"]);
          return false;
        },
        undefined,
        "Send a secret message to the console.",
      ),
    );
  }

  ngOnInit() {
    this.matIconReg.setDefaultFontSetClass("material-symbols-sharp");
    this.companyService.company.subscribe({
      next: (data) =>
        data ? (this.company = data.label) : (this.company = null),
    });

    this.workspaceService.currentWorkspace.subscribe((_data) => {
      if (_data) {
        this.workspace = _data.name;
        this.spots = this.workspaceService.showSpots();
        this.inventory = this.workspaceService.showInventory();
        this.allowPayment = _data.docTypes && _data.docTypes.length > 0;
        this.showRemote = hasFlag(_data, WorkspaceFlag.remote);
      } else {
        this.workspace = "";
        this.spots = false;
        this.inventory = false;
      }
    });
    if (this.barcodeOptions != null) {
      this.barcodeScannerService.setOptions(this.barcodeOptions);
    }
    this.authService.currentEvent.subscribe({
      next: (event) => {
        if ("login" == event) {
          this.userService.current().subscribe({
            next: (user) => (this.userInfo = user),
          });
        } else {
          this.userInfo = null;
        }
      },
    });
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  @HostListener("document:keydown", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.barcodeScannerService.handleKeyboardEvent(event);
  }

  hasPermission(...permission: Permission[]): boolean {
    return this.authService.hasPermission(...permission);
  }

  isLoggedIn() {
    return this.authService.getCurrentUsername() !== undefined;
  }
}
