import { Component, Inject, OnInit } from "@angular/core";
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from "@angular/material/legacy-dialog";

@Component({
  selector: "app-image",
  templateUrl: "./image.component.html",
  styleUrls: ["./image.component.scss"],
})
export class ImageComponent implements OnInit {
  imageUrl: any;
  loaded = false;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {}

  ngOnInit() {
    const t = this;
    this.data.subscribe((image: Blob) => {
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        () => {
          t.imageUrl = reader.result;
          this.loaded = true;
        },
        false
      );
      reader.readAsDataURL(image);
    });
  }
}
