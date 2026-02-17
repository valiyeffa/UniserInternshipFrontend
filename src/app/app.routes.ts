import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { StudentsComponent } from './pages/students/students.component';
import { CoursesComponent } from './pages/courses/courses.component';

export const routes: Routes = [
    {
        path:'',
        component: LayoutComponent,
        children:[
            {path:'', component: HomeComponent},
            {path:'students', component: StudentsComponent},
            {path:'courses', component: CoursesComponent},
        ]
    }
];
