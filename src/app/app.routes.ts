import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    loadComponent: () => import('./shared/layout/layout.component').then(m => m.LayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./pages/settings/settings.component').then(m => m.SettingsComponent),
        children: [
          { path: '', redirectTo: 'users', pathMatch: 'full' },
          {
            path: 'users',
            loadComponent: () => import('./pages/settings/users/users.component').then(m => m.UsersComponent)
          },
          {
            path: 'roles',
            loadComponent: () => import('./pages/settings/roles/roles.component').then(m => m.RolesComponent)
          }
        ]
      },
      {
        path: 'order',
        loadComponent: () => import('./pages/order/order.component').then(m => m.OrderComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];