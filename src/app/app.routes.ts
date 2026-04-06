import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { MainBodyComponent } from './features/main-body/main-body.component';
import { authGuard } from './auth/auth.guard';
import { ContractsComponent } from './features/contracts/contracts.component';
import { UsersFormComponent } from './features/users/users-form/users-form.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
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
        loadComponent: () =>
          import('./features/users/users.component').then(m => m.UsersComponent),
        title: 'Users',
      },
      // {
      //   path: 'users',
      //   loadComponent: () =>
      //     import('./features/users/users.component').then(m => m.UsersComponent),
      //   title: 'Users',
      // },
      // {
      //   path: 'users/new-user',
      //   component: UsersFormComponent,
      //   title: 'Create user',
      // },
      // {
      //   path: 'users/edit-user/:id',
      //   component: UsersFormComponent,
      //   title: 'Edit user',
      // },
      // {
      //   path: 'main',
      //   component: MainBodyComponent,
      //   title: 'Main Body',
      //   children: [
      //     {
      //       path: ':id',
      //       component: ContractsComponent
      //     }
      //   ],
      // },
    ],
  },
  {
    path: '**',
    redirectTo: ''
  }
];
