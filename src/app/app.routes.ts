import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'students',
    loadChildren: () =>
      import('./students/students.routes').then(m => m.STUDENT_ROUTES)
  },
  {
    path: 'teachers',
    loadChildren: () =>
      import('./teacher/teachers.routes').then(m => m.TEACHER_ROUTES)
  },
];