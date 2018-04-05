import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ProducttableComponent } from './producttable/producttable.component';
import { PosComponent } from './pos/pos.component';
import { AuthGuard } from './auth.guard';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'products', component: ProducttableComponent, canActivate: [AuthGuard] },
    { path: 'pos', component: PosComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: 'pos' }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(appRoutes);
