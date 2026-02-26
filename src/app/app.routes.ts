import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
                title: 'Home'
            },
            {
                path: 'students',
                loadComponent: () => import('./pages/students/students.component').then(m => m.StudentsComponent),
                title: 'Students'
            },
            {
                path: 'courses',
                loadComponent: () => import('./pages/courses/courses.component').then(m => m.CoursesComponent),
                title: 'Courses'
            },
            {
                path: 'about',
                loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
                title: 'About'
            },
            {
                path: 'login',
                loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
                title: 'Login'
            }
        ]
    }
];