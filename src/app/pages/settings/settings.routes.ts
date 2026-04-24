import { Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';

export const SETTINGS_ROUTES: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: 'users', component: UsersComponent },
      { path: 'roles', component: RolesComponent },
    ]
  }
];