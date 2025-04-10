import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {
  InventoryService,
  StocktakingService,
  Warehouse,
} from "@efaps/pos-library";
import { forkJoin } from "rxjs";

@Component({
    selector: "app-stocktaking-init",
    templateUrl: "./stocktaking-init.component.html",
    styleUrls: ["./stocktaking-init.component.scss"],
    standalone: false
})
export class StocktakingInitComponent implements OnInit {
  initForm: FormGroup;
  warehouses: Warehouse[] = [];
  constructor(
    private router: Router,
    private inventoryService: InventoryService,
    private stocktakingService: StocktakingService,
    fb: FormBuilder,
  ) {
    this.initForm = fb.group({
      warehouse: ["", [Validators.required]],
      comment: ["", []],
    });
  }

  ngOnInit(): void {
    forkJoin([
      this.stocktakingService.getOpenStocktakings(),
      this.inventoryService.getWarehouses(),
    ]).subscribe({
      next: (responses) => {
        let stocktakings = responses[0];
        let warehouses = responses[1];

        this.warehouses = warehouses.filter((warehouse) => {
          return (
            stocktakings.findIndex((stocktaking) => {
              return stocktaking.warehouseOid == warehouse.oid;
            }) > -1
          );
        });
      },
    });
  }

  submit() {
    const warehouse = this.initForm.value.warehouse;
    const comment = this.initForm.value.comment;
    this.router.navigate(["stocktaking", warehouse.oid], {
      state: {
        comment: comment,
      },
    });
  }
}
