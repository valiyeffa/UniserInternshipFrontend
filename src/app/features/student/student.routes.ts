import { Routes } from "@angular/router";
import { StudentComponent } from "./student.component";

export const Student_Routes: Routes = [
    {
        path: '',
        component: StudentComponent,
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/class-schedule/class-schedule.component').then(m => m.ClassScheduleComponent)
            },
            {
                path: 'electron-journal',
                loadComponent: () => import('./pages/electron-journal/electron-journal.component').then(m => m.ElectronJournalComponent)
            },
            {
                path: 'grade-table',
                loadComponent: () => import('./pages/grade-table/grade-table.component').then(m => m.GradeTableComponent)
            },
        ]
    },
]