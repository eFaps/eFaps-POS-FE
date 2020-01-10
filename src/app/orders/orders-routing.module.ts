import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderTableComponent } from './order-table/order-table.component';

const routes: Routes = [{ path: '', component: OrderTableComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
