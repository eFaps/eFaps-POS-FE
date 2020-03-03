import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnInit
} from "@angular/core";
import { Router } from "@angular/router";
import {
  AuthService,
  CompanyService,
  Roles,
  WorkspaceService
} from "@efaps/pos-library";
import { TranslateService } from "@ngx-translate/core";
import { Hotkey, HotkeysService } from "angular2-hotkeys";

import { environment } from "../environments/environment";
import { ElectronUtil } from "./util/electron-util";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, AfterViewChecked {
  Roles = Roles;
  title = "app";
  screenWidth: number;
  workspace: string;
  company: string;
  spots = false;
  inventory = false;
  allowPayment = false;
  electron = false;

  constructor(
    public router: Router,
    private cdRef: ChangeDetectorRef,
    public translate: TranslateService,
    private workspaceService: WorkspaceService,
    public auth: AuthService,
    private hotkeysService: HotkeysService,
    private companyService: CompanyService
  ) {
    translate.use(workspaceService.getLanguage());
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      this.screenWidth = window.innerWidth;
    };
    this.electron = environment.electron;
    this.hotkeysService.add(
      new Hotkey(
        "shift+f1",
        (event: KeyboardEvent): boolean => {
          console.log("Typed hotkey");
          this.router.navigate(["/pos"]);
          return false;
        },
        undefined,
        "Send a secret message to the console."
      )
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
        "Send a secret message to the console."
      )
    );
  }

  ngOnInit() {
    this.companyService.company.subscribe({
      next: data => (data ? (this.company = data.label) : (this.company = null))
    });

    this.workspaceService.currentWorkspace.subscribe(_data => {
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
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  async close() {
    ElectronUtil.close();
  }
}
