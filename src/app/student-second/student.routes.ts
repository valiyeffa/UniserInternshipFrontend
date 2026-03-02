import { Routes } from "@angular/router";
import { StudentLayoutComponent } from "./student-layout/studentLayout.component";

export const STUDENT_ROUTES: Routes = [
  {
    path: '',
    component: StudentLayoutComponent,
    children: [
      { path: 'schedule',  loadComponent: () => import('./schedule/schedule.component').then(m => m.ScheduleComponent) },
      { path: 'journal',   loadComponent: () => import('./journal/journal.component').then(m => m.JournalComponent) },
      { path: 'grades',   loadComponent: () => import('./grades/grades.component').then(m => m.GradesComponent) },
      { path: '', redirectTo: 'schedule', pathMatch: 'full' }
    ]
  }
];
