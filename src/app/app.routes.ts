import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { MainBodyComponent } from './features/main-body/main-body.component';
import { authGuard } from './auth/auth.guard';
import { ContractsComponent } from './features/contracts/contracts.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then(m => m.LoginComponent),
    title: 'Login',
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/home/home.component').then(m => m.HomeComponent),
        title: 'Home',
        canActivate: [authGuard]
      },
      {
        path: 'main',
        component: MainBodyComponent,
        title: 'Main Body',
        children: [
          {
            path: ':id',
            component: ContractsComponent
          }
        ],
      },
      {
        path: '**',
        redirectTo: ''
      }
    ],
  },

];
