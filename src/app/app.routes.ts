import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StudentsComponent } from './students/students.component';
import { CoursesComponent } from './courses/courses.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'about', component: AboutComponent },
];