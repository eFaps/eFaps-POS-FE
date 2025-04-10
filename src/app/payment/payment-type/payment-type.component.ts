import { Component, OnDestroy, OnInit } from "@angular/core";
import { LocalStorage } from "@efaps/ngx-store";
import { AuthService, WorkspaceService } from "@efaps/pos-library";
import { Subscription } from "rxjs";

@Component({
  selector: "app-payment-type",
  templateUrl: "./payment-type.component.html",
  styleUrls: ["./payment-type.component.scss"],
  standalone: false,
})
export class PaymentTypeComponent implements OnInit, OnDestroy {
  private subscription$ = new Subscription();

  @LocalStorage() selectedPayment: any = {};

  constructor(
    private authService: AuthService,
    private workspaceService: WorkspaceService,
  ) {}

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
}
