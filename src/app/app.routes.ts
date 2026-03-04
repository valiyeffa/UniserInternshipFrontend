import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
                title: 'Home'
            },
            {
                path: 'students-module',
                loadChildren: () => import('./features/student/student.routes').then(m => m.Student_Routes),
                title: 'StudentsModule'
            },
            {
                path: 'teacher-module',
                loadChildren: () => import('./features/teacher/teacher.routes').then(m => m.Teacher_Routes),
                title: 'StudentsModule'
            },
        ]
    }
];