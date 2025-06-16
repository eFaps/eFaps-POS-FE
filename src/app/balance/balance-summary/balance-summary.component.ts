import { Component, input, OnInit, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import {
  BalanceSummary,
  PosLibraryModule,
  PrintService,
  WorkspaceService,
} from "@efaps/pos-library";
import { Subscription } from "rxjs";

import { DatePipe } from "@angular/common";
import { MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { TranslatePipe } from "@ngx-translate/core";
import { PrintDialogComponent } from "../../shared/print-dialog/print-dialog.component";
import { BalanceSummarySectionComponent } from "../balance-summary-section/balance-summary-section.component";

@Component({
  selector: "app-balance-summary",
  templateUrl: "./balance-summary.component.html",
  styleUrls: ["./balance-summary.component.scss"],
  imports: [
    MatButton,
    MatIcon,
    BalanceSummarySectionComponent,
    DatePipe,
    PosLibraryModule,
    TranslatePipe,
  ],
})
export class BalanceSummaryComponent implements OnInit {
  private workspaceService = inject(WorkspaceService);
  private printService = inject(PrintService);
  private dialog = inject(MatDialog);

  [x: string]: {};
  subscription$ = new Subscription();
  
  summary = input.required<BalanceSummary>();
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
        this.summary().balance.id,
        detailed,
      ),
    });
  }

  hasBalance(): boolean {
    return this.summary && this.summary().balance != null;
  }
}
