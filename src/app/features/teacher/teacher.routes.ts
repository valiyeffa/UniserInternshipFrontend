import { Routes } from "@angular/router";
import { TeacherComponent } from "./teacher.component";

export const Teacher_Routes: Routes = [
    {
        path: '',
        component: TeacherComponent,
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/lesson-plans/lesson-plans.component').then(m => m.LessonPlansComponent)
            },
            {
                path: 'student-assessment',
                loadComponent: () => import('./pages/student-assessment/student-assessment.component').then(m => m.StudentAssessmentComponent)
            },
            {
                path: 'attendance-management',
                loadComponent: () => import('./pages/attendance-management/attendance-management.component').then(m => m.AttendanceManagementComponent)
            },
        ]
    },
]