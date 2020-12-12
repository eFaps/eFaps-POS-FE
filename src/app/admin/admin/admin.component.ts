import { Component, OnInit } from "@angular/core";
import {
  AdminService,
  ConfigService,
  Versions,
  Extension,
} from "@efaps/pos-library";
import { Subscription } from "rxjs";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"],
})
export class AdminComponent implements OnInit {
  busy: Subscription;
  versions: Versions;
  pinpadsUrl = "extensions/pinpad-element.js";
  lazyElements: Extension[] = [];
  constructor(
    private adminService: AdminService,
    private configService: ConfigService
  ) {}

  ngOnInit() {
    this.adminService
      .version()
      .subscribe((versions) => (this.versions = versions));
    this.configService.getExtensions().subscribe({
      next: (extensions) => {
        extensions
          .filter((extension) => extension.key === "admin")
          .forEach((extension) => {
            this.lazyElements.push(extension);
          });
      },
    });
  }

  reload() {
    this.busy = this.adminService.reload().subscribe();
  }
}
