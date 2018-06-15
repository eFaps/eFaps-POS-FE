import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';

import { PrintService, WorkspaceService } from '../../services/index';
import { ImageComponent } from '../../shared/image/image.component';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.scss']
})
export class OrderDialogComponent implements OnInit {
  allowPayment: boolean;
  constructor(private workspaceService: WorkspaceService,
    private printService: PrintService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<OrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit() {
    this.workspaceService.currentWorkspace.subscribe(_data => {
      this.allowPayment = _data.docTypes && _data.docTypes.length > 0;
    });
  }

  print() {
    const dialogRef = this.dialog.open(ImageComponent, {
      data: this.printService.printJobPreview(this.data.order)
    });
  }
}
