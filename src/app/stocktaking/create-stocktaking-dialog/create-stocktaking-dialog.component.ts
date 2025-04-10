import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import {
  InventoryService,
  StocktakingService,
  Warehouse,
} from "@efaps/pos-library";

@Component({
  selector: "app-create-stocktaking-dialog",
  templateUrl: "./create-stocktaking-dialog.component.html",
  styleUrls: ["./create-stocktaking-dialog.component.scss"],
  standalone: false,
})
export class CreateStocktakingDialogComponent implements OnInit {
  stocktakingForm: FormGroup;
  warehouses: Warehouse[] = [];

  constructor(
    fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateStocktakingDialogComponent>,
    private inventoryService: InventoryService,
    private stocktakingService: StocktakingService,
  ) {
    this.stocktakingForm = fb.group({
      warehouse: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.inventoryService.getWarehouses().subscribe({
      next: (warehouses) => (this.warehouses = warehouses),
    });
  }

  submit(): void {
    this.stocktakingService
      .createStocktaking(this.stocktakingForm.value.warehouse.oid)
      .subscribe({
        next: (stocktaking) => {
          if (stocktaking) {
            this.dialogRef.close(true);
          }
        },
      });
  }
}
