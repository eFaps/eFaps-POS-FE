import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ProducttableComponent } from './producttable/producttable.component';
import { PaymentComponent } from './payment/payment.component';
import { PosComponent } from './pos/pos.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { AuthGuard, WorkspaceGuard } from './guards/index';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'products', component: ProducttableComponent, canActivate: [AuthGuard, WorkspaceGuard] },
    { path: 'pos', component: PosComponent, canActivate: [AuthGuard, WorkspaceGuard] },
    { path: 'workspaces', component: WorkspaceComponent, canActivate: [AuthGuard] },
    { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: 'pos' }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(appRoutes);
