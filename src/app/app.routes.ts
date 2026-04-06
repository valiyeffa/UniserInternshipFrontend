import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { authGuard } from './auth/auth.guard';
import { SettingsComponent } from './features/settings/settings.component';
import { ContractsComponent } from './features/contracts/contracts.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'modules',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then(m => m.LoginComponent),
    title: 'Login',
  },
  {
    path: 'modules',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/modules/modules.component').then(m => m.ModulesComponent),
        title: 'Home',
      },
      {
        path: 'settings',
        component: SettingsComponent,
        title: 'Settings',
        loadChildren:()=>import('./features/settings/settings.routes').then(m=>m.Settings_Routes)
      },
      {
        path: 'contracts',
        component: ContractsComponent,
        title: 'Contracts',
        loadChildren:()=>import('./features/contracts/contracts.routes').then(m=>m.Contracts_Services)
      },
    ],
  },
  {
    path: '**',
    redirectTo: ''
  }
];
