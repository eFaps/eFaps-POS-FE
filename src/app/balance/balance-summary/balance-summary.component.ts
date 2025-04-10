import { Component, Input, OnInit, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import {
  BalanceSummary,
  PrintService,
  WorkspaceService,
} from "@efaps/pos-library";
import { Subscription } from "rxjs";

import { PrintDialogComponent } from "../../shared/print-dialog/print-dialog.component";

@Component({
  selector: "app-balance-summary",
  templateUrl: "./balance-summary.component.html",
  styleUrls: ["./balance-summary.component.scss"],
  standalone: false,
})
export class BalanceSummaryComponent implements OnInit {
  private workspaceService = inject(WorkspaceService);
  private printService = inject(PrintService);
  private dialog = inject(MatDialog);

  [x: string]: {};
  subscription$ = new Subscription();
  @Input()
  summary!: BalanceSummary;
  printer: boolean = false;
  printerDetailed: boolean = false;
  private workspaceOid!: string;

  ngOnInit() {
    this.subscription$.add(
      this.workspaceService.currentWorkspace.subscribe({
        next: (workspace) => {
          if (workspace) {
            this.printer = workspace.printCmds.some(
              (x) => x.target === "BALANCE",
            );
            this.printerDetailed = workspace.printCmds.some(
              (x) => x.target === "BALANCE_DETAILED",
            );
            this.workspaceOid = workspace.oid;
          } else {
            this.printer = false;
          }
        },
      }),
    );
  }

  print(detailed: boolean) {
    this.dialog.open(PrintDialogComponent, {
      data: this.printService.printBalance(
        this.workspaceOid,
        this.summary.balance.id,
        detailed,
      ),
    });
  }

  hasBalance(): boolean {
    return this.summary && this.summary.balance != null;
  }
}
