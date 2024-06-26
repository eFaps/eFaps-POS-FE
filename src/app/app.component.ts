import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
  computed,
} from "@angular/core";
import { Router } from "@angular/router";
import { LocalStorage } from "@efaps/ngx-store";
import {
  AuthService,
  BarcodeOptions,
  BarcodeScannerService,
  CompanyService,
  LoaderService,
  Permission,
  User,
  UserService,
  WorkspaceService,
} from "@efaps/pos-library";
import { TranslateService } from "@ngx-translate/core";
import { Hotkey, HotkeysService } from "angular2-hotkeys";

import { MatIconRegistry } from "@angular/material/icon";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, AfterViewChecked {
  Permission = Permission;
  title = "app";
  screenWidth: number;
  workspace!: string;
  company!: string | null;
  spots = false;
  inventory = false;
  allowPayment = false;
  @LocalStorage() barcodeOptions: BarcodeOptions | null = null;
  userInfo: User | null = null;
  isLoading = this.loaderService.isLoading;

  constructor(
    private matIconReg: MatIconRegistry,
    public router: Router,
    private cdRef: ChangeDetectorRef,
    public authService: AuthService,
    public translate: TranslateService,
    private workspaceService: WorkspaceService,
    public userService: UserService,
    private hotkeysService: HotkeysService,
    private companyService: CompanyService,
    private barcodeScannerService: BarcodeScannerService,
    private loaderService: LoaderService,
  ) {
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
