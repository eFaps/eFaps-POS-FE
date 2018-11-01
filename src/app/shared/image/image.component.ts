import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  imageUrl: any;
  loaded = false;

  constructor(private dialogRef: MatDialogRef<ImageComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
    const t = this;
    this.data.subscribe(image => {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        t.imageUrl = reader.result;
        this.loaded = true;
      }, false);
      reader.readAsDataURL(image);
    });
  }
}
