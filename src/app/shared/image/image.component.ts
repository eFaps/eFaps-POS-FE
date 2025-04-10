import { Component, OnInit, inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-image",
  templateUrl: "./image.component.html",
  styleUrls: ["./image.component.scss"],
  standalone: false,
})
export class ImageComponent implements OnInit {
  private data = inject(MAT_DIALOG_DATA);

  imageUrl: any;
  loaded = false;

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
        false,
      );
      reader.readAsDataURL(image);
    });
  }
}
