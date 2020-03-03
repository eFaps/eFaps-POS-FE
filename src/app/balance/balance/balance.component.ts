import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import {
  Balance,
  BalanceService,
  BalanceSummary,
  DocumentService,
  PayableHead,
  PrintService,
  WorkspaceService
} from "@efaps/pos-library";
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";

import { ConfirmDialogComponent } from "../../shared/confirm-dialog/confirm-dialog.component";
import { PrintDialogComponent } from "../../shared/print-dialog/print-dialog.component";

@Component({
  selector: "app-balance",
  templateUrl: "./balance.component.html",
  styleUrls: ["./balance.component.scss"]
})
export class BalanceComponent implements OnInit, OnDestroy {
  currentBalance: Balance;
  payables: PayableHead[] = [];
  summary: BalanceSummary;
  busy: Subscription;
  subscription$ = new Subscription();
  private print = false;
  private workspaceOid: string;

  constructor(
    private balanceService: BalanceService,
    private documentService: DocumentService,
    private printService: PrintService,
    private workspaceService: WorkspaceService,
    private translateService: TranslateService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.subscription$.add(
      this.balanceService.currentBalance.subscribe(balance => {
        if (this.busy) {
          this.busy.unsubscribe();
        }
        this.currentBalance = balance;
        this.payables = [];
        if (balance) {
          this.busy = this.documentService
            .getDocuments4Balance(balance)
            .subscribe({
              next: payables => (this.payables = this.payables.concat(payables))
            });
          this.subscription$.add(
            this.balanceService.getSummary(balance).subscribe({
              next: summary => (this.summary = summary)
            })
          );
        }
      })
    );
    this.subscription$.add(
      this.workspaceService.currentWorkspace.subscribe({
        next: workspace => {
          if (workspace) {
            this.print = workspace.printCmds.some(x => x.target === "BALANCE");
            this.workspaceOid = workspace.oid;
          }
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
    if (this.busy) {
      this.busy.unsubscribe();
    }
  }

  init() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "300px",
      data: { title: this.translateService.instant("BALANCE.CONFIRM-OPEN") }
    });
    dialogRef.afterClosed().subscribe(_result => {
      if (_result) {
        this.balanceService.init();
      }
    });
  }

  close() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "300px",
      data: { title: this.translateService.instant("BALANCE.CONFIRM-CLOSE") }
    });
    dialogRef.afterClosed().subscribe({
      next: result => {
        if (result) {
          this.balanceService.close(this.currentBalance).subscribe({
            next: balance => {
              if (this.print) {
                this.dialog.open(PrintDialogComponent, {
                  data: this.printService.printBalance(
                    this.workspaceOid,
                    balance.id
                  )
                });
              }
            }
          });
        }
      }
    });
  }
}
