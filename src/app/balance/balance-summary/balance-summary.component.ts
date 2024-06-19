import { Component, Input, OnInit } from "@angular/core";
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
})
export class BalanceSummaryComponent implements OnInit {
  [x: string]: {};
  subscription$ = new Subscription();
  @Input()
  summary!: BalanceSummary;
  printer: boolean = false;
  private workspaceOid!: string;

  constructor(
    private workspaceService: WorkspaceService,
    private printService: PrintService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.subscription$.add(
      this.workspaceService.currentWorkspace.subscribe({
        next: (workspace) => {
          if (workspace) {
            this.printer = workspace.printCmds.some(
              (x) => x.target === "BALANCE",
            );
            this.workspaceOid = workspace.oid;
          } else {
            this.printer = false;
          }
        },
      }),
    );
  }

  print() {
    this.dialog.open(PrintDialogComponent, {
      data: this.printService.printBalance(
        this.workspaceOid,
        this.summary.balance.id,
      ),
    });
  }

  hasBalance(): boolean {
    return this.summary && this.summary.balance != null;
  }
}
