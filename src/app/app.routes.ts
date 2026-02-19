import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { StudentsComponent } from './pages/students/students.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    {
        path:'',
        component: LayoutComponent,
        children:[
            {path:'', component: HomeComponent, title:'Home'},
            {path:'students', component: StudentsComponent, title:'Students'},
            {path:'courses', component: CoursesComponent, title:'Courses'},
            {path:'about', component: AboutComponent, title:'About'},
            {path:'login', component: LoginComponent, title:'Login'},
        ]
    }
];
