import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import { LocalStorage } from "@efaps/ngx-store";
import { AuthService, Permission, WorkspaceService } from "@efaps/pos-library";
import { Subscription } from "rxjs";

import { AutoComponent } from "../auto/auto.component";
import { CardComponent } from "../card/card.component";
import { CashComponent } from "../cash/cash.component";
import { FreeComponent } from "../free/free.component";
import { RedeemCreditNoteComponent } from "../redeem-credit-note/redeem-credit-note.component";

@Component({
  selector: "app-payment-type",
  templateUrl: "./payment-type.component.html",
  styleUrls: ["./payment-type.component.scss"],
  imports: [
    MatTabGroup,
    MatTab,
    CashComponent,
    CardComponent,
    FreeComponent,
    AutoComponent,
    RedeemCreditNoteComponent,
  ],
})
export class PaymentTypeComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private workspaceService = inject(WorkspaceService);

  private subscription$ = new Subscription();

  @LocalStorage() selectedPayment: any = {};

  Permission = Permission;

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  get auto() {
    return this.workspaceService.hasAutoPayment();
  }

  get selected() {
    const index = this.selectedPayment[this.authService.getCurrentUsername()];
    if (index) {
      return index;
    }
    return 0;
  }

  setIndex(data: any) {
    this.selectedPayment[this.authService.getCurrentUsername()] = data;
    this.selectedPayment.save();
  }

  hasPermission(...permission: Permission[]): boolean {
    return this.authService.hasPermission(...permission);
  }
}
