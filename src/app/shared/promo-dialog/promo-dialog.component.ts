import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-promo-dialog',
  standalone: true,
  imports: [],
  templateUrl: './promo-dialog.component.html',
  styleUrl: './promo-dialog.component.scss'
})
export class PromoDialogComponent {
  
  constructor(
    public dialogRef: MatDialogRef<PromoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string | undefined
  ) {
   
  }
}
