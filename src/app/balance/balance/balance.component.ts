import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";
import {
  Balance,
  BalanceService,
  BalanceSummary,
  CashEntry,
  ConfigService,
  DocumentService,
  Payable,
  CashEntryType,
  PayableHead,
  PrintService,
  WorkspaceService,
  Currency,
} from "@efaps/pos-library";
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";
import { BALANCE_ACTIVATE_CASHENTRY } from "src/app/util/keys";

import { ConfirmDialogComponent } from "../../shared/confirm-dialog/confirm-dialog.component";
import { PrintDialogComponent } from "../../shared/print-dialog/print-dialog.component";
import { OpeningBalanceDialogComponent } from "../opening-balance-dialog/opening-balance-dialog.component";

@Component({
  selector: "app-balance",
  templateUrl: "./balance.component.html",
  styleUrls: ["./balance.component.scss"],
})
export class BalanceComponent implements OnInit, OnDestroy {
  currentBalance!: Balance;
  payables: PayableHead[] = [];
  summary: BalanceSummary | undefined;
  busy!: Subscription;
  subscription$ = new Subscription();
  private print = false;
  private workspaceOid!: string;
  private useCashEntry: boolean = false;

  constructor(
    private balanceService: BalanceService,
    private documentService: DocumentService,
    private printService: PrintService,
    private workspaceService: WorkspaceService,
    private translateService: TranslateService,
    private configService: ConfigService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.subscription$.add(
      this.balanceService.currentBalance.subscribe((balance) => {
        if (this.busy) {
          this.busy.unsubscribe();
        }
        this.currentBalance = balance;
        this.payables = [];
        if (balance) {
          this.busy = this.documentService
            .getDocuments4Balance(balance)
            .subscribe({
              next: (payables) =>
                (this.payables = this.payables.concat(payables)),
            });
          this.subscription$.add(
            this.balanceService.getSummary(balance).subscribe({
              next: (summary) => (this.summary = summary),
            })
          );
        }
      })
    );
    this.subscription$.add(
      this.workspaceService.currentWorkspace.subscribe({
        next: (workspace) => {
          if (workspace) {
            this.print = workspace.printCmds.some(
              (x) => x.target === "BALANCE"
            );
            this.workspaceOid = workspace.oid;
          }
        },
      })
    );
    this.subscription$.add(
      this.configService
        .getSystemConfig<boolean>(BALANCE_ACTIVATE_CASHENTRY)
        .subscribe({
          next: (value) => {
            this.useCashEntry = value;
          },
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
            }
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
          this.balanceService.close(this.currentBalance).subscribe({
            next: (balance) => {
              if (this.print) {
                this.dialog.open(PrintDialogComponent, {
                  data: this.printService.printBalance(
                    this.workspaceOid,
                    balance.id
                  ),
                });
              }
            },
          });
        }
      },
    });
  }
}
