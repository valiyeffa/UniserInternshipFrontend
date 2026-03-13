import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { MainBodyComponent } from './features/main-body/main-body.component';
import { authGuard } from './auth/auth.guard';

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
            path: 'student',
            loadChildren: () =>
              import('./features/student/student.routes').then(m => m.Student_Routes),
          },
          {
            path: 'teacher',
            loadChildren: () =>
              import('./features/teacher/teacher.routes').then(m => m.Teacher_Routes),
          },
        ],
      },
      {
        path: '**',
        redirectTo: ''
      }
    ],
  },

];
