import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard, AuthGuard, WorkspaceGuard } from '@efaps/pos-library';

import { AdminComponent } from './admin/admin/admin.component';
import { BalanceComponent } from './balance/balance/balance.component'
import { ContactTableComponent } from './contacts/contact-table/contact-table.component';
import { InventoryComponent } from './inventory/inventory/inventory.component';
import { LoginComponent } from './login/login.component';
import { OrderTableComponent } from './orders/order-table/order-table.component';
import { PaymentComponent } from './payment/payment.component';
import { PosComponent } from './pos/pos.component';
import { ProducttableComponent } from './products/producttable/producttable.component';
import { SpotsComponent } from './spots/spots/spots.component';
import { WorkspaceComponent } from './workspace/workspace.component';

const appRoutes: Routes = [








  { path: 'spots', component: SpotsComponent, canActivate: [AuthGuard] },
  { path: 'inventory', component: InventoryComponent, canActivate: [AuthGuard] },
  { path: 'balance', component: BalanceComponent, canActivate: [AuthGuard] },

  // otherwise redirect to home
  { path: '**', redirectTo: 'pos' }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(appRoutes);
