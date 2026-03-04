import { Routes } from "@angular/router";
import { StudentComponent } from "./student.component";
import { ClassScheduleComponent } from "./pages/class-schedule/class-schedule.component";
import { ElectronJournalComponent } from "./pages/electron-journal/electron-journal.component";
import { GradeTableComponent } from "./pages/grade-table/grade-table.component";

export const Student_Routes: Routes = [
    {
        path: '',
        component: StudentComponent,
        children: [
            {
                path: '',
                component: ClassScheduleComponent
            },
            {
                path: 'electron-journal',
                component: ElectronJournalComponent
            },
            {
                path: 'grade-table',
                component: GradeTableComponent
            },
        ]
    },
]