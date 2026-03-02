import { Routes } from '@angular/router';
import { TeacherPageComponent } from './teacher-page/teacher-page.component';
import { DersPlaniComponent } from './ders-plani/ders-plani.component';
import { TelebeQiymetlendirmeComponent } from './telebe-qiymetlendirme/telebe-qiymetlendirme.component';
import { DavamiyyetComponent } from './davamiyyet/davamiyyet.component';

export const TEACHER_ROUTES: Routes = [
  {
    path: '',
    component: TeacherPageComponent,
    children: [
      { path: 'ders-plani', component: DersPlaniComponent },
      { path: 'telebe-qiymetlendirme', component: TelebeQiymetlendirmeComponent },
      { path: 'davamiyyet', component: DavamiyyetComponent },
    ]
  }
];
