import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { MainBodyComponent } from './features/main-body/main-body.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/home/home.component').then(m => m.HomeComponent),
        title: 'Home',
      },
      {
        path: 'main',
        component: MainBodyComponent,
        title: 'Main Body',
        children: [
          {
            path: 'student',
            loadChildren: () =>
              import('./features/student/student.routes').then(m=>m.Student_Routes),
          },
          {
            path: 'teacher',
            loadChildren: () =>
              import('./features/teacher/teacher.routes').then(m => m.Teacher_Routes),
          },
        ],
      },
    ],
  },
];
