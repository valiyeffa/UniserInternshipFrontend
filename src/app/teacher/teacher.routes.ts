import { Routes } from "@angular/router";
import { TeacherLayoutComponent } from "./teacher-layout/teacherLayout.component";

export const TEACHER_ROUTES: Routes = [
  {
    path: '',
    component: TeacherLayoutComponent,
    children: [
      { path: 'lesson-plan',  loadComponent: () => import('./lesson-plan/lessonPlan.component').then(m => m.LessonPlanComponent) },
      { path: 'assessment',   loadComponent: () => import('./assessment/assessment.component').then(m => m.AssessmentComponent) },
      { path: 'attendance',   loadComponent: () => import('./attendance/attendance.component').then(m => m.AttendanceComponent) },
      { path: '', redirectTo: 'lesson-plan', pathMatch: 'full' }
    ]
  }
];
