import { Routes } from '@angular/router';
import { StudentsPageComponent } from './students-page/students-page.component';
import { DersCedveliComponent } from './ders-cedveli/ders-cedveli.component';
import { QiymetCedveliComponent } from './qiymet-cedveli/qiymet-cedveli.component';
import { ElektronJurnalComponent } from './elektron-jurnal/elektron-jurnal.component';

export const STUDENT_ROUTES: Routes = [
  {
    path: '',
    component: StudentsPageComponent,
    children: [
      { path: 'ders-cedveli', component: DersCedveliComponent },
      { path: 'qiymet-cedveli', component: QiymetCedveliComponent },
      { path: 'elektron-jurnal', component: ElektronJurnalComponent },
    ]
  }
];