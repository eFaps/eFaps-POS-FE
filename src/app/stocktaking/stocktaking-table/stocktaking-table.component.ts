import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { StocktakingService } from "@efaps/pos-library";

@Component({
  selector: "app-stocktaking-table",
  templateUrl: "./stocktaking-table.component.html",
  styleUrls: ["./stocktaking-table.component.scss"],
})
export class StocktakingTableComponent implements OnInit {
  constructor(
    private router: Router,
    private stocktakingService: StocktakingService
  ) {}

  ngOnInit(): void {}

  perform() {
    this.router.navigate(["stocktaking", "process"]);
  }
}
