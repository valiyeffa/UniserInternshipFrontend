import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { SettingsComponent } from './pages/settings/settings.component';
import { UsersComponent } from './pages/settings/users/users.component';
import { RolesComponent } from './pages/settings/roles/roles.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    loadComponent: () =>
      import('./shared/layout/layout.component').then(m => m.LayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'settings',
        component: SettingsComponent,
        children: [
          { path: '', redirectTo: 'users', pathMatch: 'full' },
          { path: 'users', component: UsersComponent },
          { path: 'roles', component: RolesComponent }
        ]
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./pages/order/order.component').then(m => m.OrderComponent),
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          {
            path: 'dashboard',
            loadComponent: () =>
              import('./pages/order/dashboard/order-dashboard.component')
                .then(m => m.OrderDashboardComponent)
          },
          {
            // Real URL: /modules/orders/railwayOrders
            path: 'railwayOrders',
            children: [
              {
                path: '',
                loadComponent: () =>
                  import('./pages/order/railway-order/railway-order.component')
                    .then(m => m.RailwayOrderComponent)
              },
              {
                // Create: /modules/orders/railwayOrders/new-railwayOrders
                path: 'new-railwayOrders',
                loadComponent: () =>
                  import('./pages/order/railway-order/new-railway-order/new-railway-order.component')
                    .then(m => m.NewRailwayOrderComponent)
              },
              {
                // Edit: /modules/orders/railwayOrders/edit-railwayOrders/:id
                path: 'edit-railwayOrders/:id',
                loadComponent: () =>
                  import('./pages/order/railway-order/new-railway-order/new-railway-order.component')
                    .then(m => m.NewRailwayOrderComponent)
              }
            ]
          },
          {
            // Köhnə format redirect
            path: 'railway-orders',
            redirectTo: 'railwayOrders',
            pathMatch: 'full'
          }
        ]
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];