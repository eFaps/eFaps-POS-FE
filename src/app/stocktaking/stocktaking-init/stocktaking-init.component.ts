import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import {
  InventoryService,
  StocktakingService,
  Warehouse,
} from "@efaps/pos-library";

@Component({
  selector: "app-stocktaking-init",
  templateUrl: "./stocktaking-init.component.html",
  styleUrls: ["./stocktaking-init.component.scss"],
})
export class StocktakingInitComponent implements OnInit {
  initForm: FormGroup;
  warehouses: Warehouse[] = [];
  constructor(
    private router: Router,
    private inventoryService: InventoryService,
    private stocktakingService: StocktakingService,
    fb: FormBuilder
  ) {
    this.initForm = fb.group({
      warehouse: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.inventoryService.getWarehouses().subscribe({
      next: (warehouses) => (this.warehouses = warehouses),
    });
  }

  submit() {
    const warehouse = this.initForm.value.warehouse;
    this.stocktakingService.createStocktaking(warehouse.oid).subscribe({
      next: (stocktacking) => {
        this.router.navigate(["stocktaking", "process"]);
      },
    });
  }
}
