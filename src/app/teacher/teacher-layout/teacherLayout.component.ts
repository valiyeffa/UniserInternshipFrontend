import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-teacher-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav class="flex flex-col gap-4 text-yellow-200 m-10">
      <a routerLink="lesson-plan">lesson - plan</a>
      <a routerLink="attendance">attendance</a>
      <a routerLink="assessment">assesment</a>
    </nav>
    <router-outlet />
  `
})
export class TeacherLayoutComponent {}