import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ProducttableComponent } from './producttable/producttable.component';
import { SalesComponent } from './sales/sales.component';
import { AuthGuard } from './auth.guard';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'products', component: ProducttableComponent, canActivate: [AuthGuard] },
    { path: 'sales', component: SalesComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: 'sales' }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(appRoutes);
