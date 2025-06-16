import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import {
  Balance,
  BalanceService,
  BalanceSummary,
  CashEntry,
  CashEntryType,
  ConfigService,
  Currency,
  DocumentService,
  PayableHead,
  PrintService,
  WorkspaceService,
} from "@efaps/pos-library";
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";
import { BALANCE_ACTIVATE_CASHENTRY } from "src/app/util/keys";

import { MatButton } from "@angular/material/button";
import { MatTab, MatTabContent, MatTabGroup } from "@angular/material/tabs";
import { ConfirmDialogComponent } from "../../shared/confirm-dialog/confirm-dialog.component";
import { PrintDialogComponent } from "../../shared/print-dialog/print-dialog.component";
import { BalanceDocumentListComponent } from "../balance-document-list/balance-document-list.component";
import { BalanceListComponent } from "../balance-list/balance-list.component";
import { BalancePaymentListComponent } from "../balance-payment-list/balance-payment-list.component";
import { BalanceSummaryComponent } from "../balance-summary/balance-summary.component";
import { CashEntryDialogComponent } from "../cash-entry-dialog/cash-entry-dialog.component";
import { DocumentListComponent } from "../document-list/document-list.component";
import { OpeningBalanceDialogComponent } from "../opening-balance-dialog/opening-balance-dialog.component";

@Component({
  selector: "app-balance",
  templateUrl: "./balance.component.html",
  styleUrls: ["./balance.component.scss"],
  imports: [
    MatTabGroup,
    MatTab,
    MatButton,
    BalanceDocumentListComponent,
    BalancePaymentListComponent,
    BalanceSummaryComponent,
    MatTabContent,
    BalanceListComponent,
    DocumentListComponent,
  ],
})
export class BalanceComponent implements OnInit, OnDestroy {
  private balanceService = inject(BalanceService);
  private documentService = inject(DocumentService);
  private printService = inject(PrintService);
  private workspaceService = inject(WorkspaceService);
  private translateService = inject(TranslateService);
  private configService = inject(ConfigService);
  private dialog = inject(MatDialog);

  currentBalance: Balance | undefined;
  payables: PayableHead[] = [];
  summary: BalanceSummary | undefined;
  subscription$ = new Subscription();
  private print = false;
  private workspaceOid!: string;
  useCashEntry: boolean = false;

  ngOnInit() {
    this.subscription$.add(
      this.balanceService.currentBalance.subscribe((balance) => {
        if (
          balance != null &&
          (this.currentBalance == undefined ||
            this.currentBalance.id != balance.id)
        ) {
          this.payables = [];
          this.currentBalance = balance;
          this.subscription$.add(
            this.documentService.getDocuments4Balance(balance).subscribe({
              next: (payables) =>
                (this.payables = this.payables.concat(payables)),
            }),
          );
          this.subscription$.add(
            this.balanceService.getSummary(balance).subscribe({
              next: (summary) => (this.summary = summary),
            }),
          );
        }
      }),
    );
    this.subscription$.add(
      this.workspaceService.currentWorkspace.subscribe({
        next: (workspace) => {
          if (workspace) {
            this.print = workspace.printCmds.some(
              (x) => x.target === "BALANCE",
            );
            this.workspaceOid = workspace.oid;
          }
        },
      }),
    );
    this.subscription$.add(
      this.configService
        .getSystemConfig<boolean>(BALANCE_ACTIVATE_CASHENTRY)
        .subscribe({
          next: (value) => {
            this.useCashEntry = value;
          },
        }),
    );
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  init() {
    let dialogRef: MatDialogRef<any, any>;
    if (this.useCashEntry) {
      dialogRef = this.dialog.open(OpeningBalanceDialogComponent, {
        width: "500px",
        data: { title: this.translateService.instant("BALANCE.CONFIRM-OPEN") },
      });
    } else {
      dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: "300px",
        data: { title: this.translateService.instant("BALANCE.CONFIRM-OPEN") },
      });
    }
    dialogRef.afterClosed().subscribe((_result: any) => {
      if (_result) {
        const propertyNames = Object.getOwnPropertyNames(_result);
        this.balanceService.init();
        if (propertyNames.length > 0) {
          const sub = this.balanceService.currentBalance.subscribe(
            (balance) => {
              if (balance != null) {
                const cashEntries: CashEntry[] = [];
                for (const property of propertyNames) {
                  cashEntries.push({
                    balanceOid: balance.id,
                    entryType: CashEntryType.OPENING,
                    amount: Number.parseFloat(_result[property]),
                    currency: Currency[property as keyof typeof Currency],
                  });
                }
                this.balanceService
                  .addCashEntries(balance, cashEntries)
                  .subscribe();
                sub.unsubscribe();
              }
            },
          );
        }
      }
    });
  }

  close() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "300px",
      data: { title: this.translateService.instant("BALANCE.CONFIRM-CLOSE") },
    });
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.balanceService.close(this.currentBalance!).subscribe({
            next: (balance) => {
              if (this.print) {
                this.dialog.open(PrintDialogComponent, {
                  data: this.printService.printBalance(
                    this.workspaceOid,
                    balance.id,
                    false,
                  ),
                });
              }
              this.currentBalance = undefined;
              this.payables = [];
              this.summary = undefined;
            },
          });
        }
      },
    });
  }

  hasBalance(): Boolean {
    return !!this.currentBalance;
  }

  register() {
    this.dialog
      .open(CashEntryDialogComponent)
      .afterClosed()
      .subscribe({
        next: (data) => {
          if (data) {
            this.balanceService
              .addCashEntries(this.currentBalance!, [
                {
                  balanceOid: this.currentBalance!.id,
                  entryType: data.type,
                  amount: data.amount,
                  currency: data.currency,
                },
              ])
              .subscribe();
          }
        },
      });
  }
}
