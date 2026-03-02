import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav class="flex flex-col gap-4 text-yellow-200 m-10">
      <a routerLink="schedule">schedule</a>
      <a routerLink="grades">grades</a>
      <a routerLink="journal">journal</a>
    </nav>
    <router-outlet />
  `
})
export class StudentLayoutComponent {}