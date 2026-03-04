import { Routes } from "@angular/router";
import { TeacherComponent } from "./teacher.component";
import { EditStudentComponent } from "./pages/students-list/edit-student/edit-student.component";
import { AddStudentComponent } from "./pages/students-list/add-student/add-student.component";
import { LessonPlansComponent } from "./pages/lesson-plans/lesson-plans.component";
import { StudentAssessmentComponent } from "./pages/student-assessment/student-assessment.component";
import { AttendanceManagementComponent } from "./pages/attendance-management/attendance-management.component";
import { StudentsListComponent } from "./pages/students-list/students-list.component";

export const Teacher_Routes: Routes = [
    {
        path: '',
        component: TeacherComponent,
        children: [
            {
                path: '',
                component: LessonPlansComponent
            },
            {
                path: 'student-assessment',
                component: StudentAssessmentComponent
            },
            {
                path: 'attendance-management',
                component: AttendanceManagementComponent
            },
            {
                path: 'students-list',
                component: StudentsListComponent
            },
            {
                path: 'students-list/add-student',
                component: AddStudentComponent
            },
            {
                path: 'students-list/edit-student/:id',
                component: EditStudentComponent
            },
        ]
    },
]