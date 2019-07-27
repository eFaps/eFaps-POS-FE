import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { DocumentType } from '../../model/index';
import { PrintService } from '../../services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  DocumentType = DocumentType;
  printObservable: Observable<any> = null;

  constructor(private printService: PrintService,
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    if (this.data.print) {
      this.printObservable = this.printService.printTicket(this.data.workspaceOid, this.data.document)
    }
  }
}
