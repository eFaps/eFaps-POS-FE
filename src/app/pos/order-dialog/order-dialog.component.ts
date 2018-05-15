import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';

import { WorkspaceService } from '../../services/index';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.scss']
})
export class OrderDialogComponent implements OnInit {
  allowPayment: boolean;
  constructor(private workspaceService: WorkspaceService,
    public dialogRef: MatDialogRef<OrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit() {
      this.workspaceService.currentWorkspace.subscribe(_data => {
        this.allowPayment = _data.docTypes && _data.docTypes.length > 0;
      });
  }


}
